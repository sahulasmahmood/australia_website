import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Testimonial from "@/config/utils/admin/testimonial/testimonialSchema";
import { uploadToCloudinary } from "@/config/utils/cloudinary";

// GET - Fetch testimonials with pagination
export async function GET(request: NextRequest) {
  try { 
    await connectDB(); 

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const rating = searchParams.get("rating");
    const serviceType = searchParams.get("serviceType");
    const search = searchParams.get("search");

    // Build query
    const query: any = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (rating) {
      query.rating = parseInt(rating);
    }

    if (serviceType && serviceType !== "all") {
      query.serviceType = serviceType;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [testimonials, total, publishedCount, draftCount] = await Promise.all([
      Testimonial.find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Testimonial.countDocuments(query),
      Testimonial.countDocuments({ ...query, status: "published" }),
      Testimonial.countDocuments({ ...query, status: "draft" }),
    ]);

    return NextResponse.json({
      success: true,
      data: testimonials,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      stats: {
        total,
        published: publishedCount,
        draft: draftCount
      },
      message: "Testimonials fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const contentType = request.headers.get("content-type");
    let body: any;
    let avatarPath = "";

    // Handle multipart form data (with file upload)
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Extract form fields
      body = {
        name: formData.get("name") as string,
        location: formData.get("location") as string,
        content: formData.get("content") as string,
        rating: formData.get("rating") as string,
        serviceType: formData.get("serviceType") as string,
        date: formData.get("date") as string,
        status: formData.get("status") as string,
      };

      // Handle file upload
      const file = formData.get("avatar") as File;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer, 'testimonials');
        avatarPath = result.secure_url;
      }
    } else {
      // Handle JSON data
      body = await request.json();
      avatarPath = body.avatar || "";
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "location",
      "content",
      "rating",
      "serviceType",
    ];
    for (const field of requiredFields) {
      if (
        !body[field] ||
        (typeof body[field] === "string" && body[field].trim() === "")
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required and cannot be empty`,
          },
          { status: 400 }
        );
      }
    }

    // Validate rating range
    const rating = parseInt(body.rating);
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const testimonialData = {
      name: body.name.trim(),
      location: body.location.trim(),
      avatar: avatarPath,
      content: body.content.trim(),
      rating: rating,
      serviceType: body.serviceType.trim(),
      date: body.date ? new Date(body.date) : new Date(),
      status: body.status || "published",
    };

    const newTestimonial = new Testimonial(testimonialData);
    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json({
      success: true,
      data: savedTestimonial,
      message: "Testimonial created successfully",
    });
  } catch (error: unknown) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
