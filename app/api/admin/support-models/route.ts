import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import SupportModel from "@/config/utils/admin/supportModel/supportModelSchema";
import { uploadToCloudinary } from "@/config/utils/cloudinary";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// Helper function to verify admin token
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "Authorization header required" },
        { status: 401 }
      ),
    };
  }
  if (!process.env.JWT_SECRET) {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "JWT_SECRET not configured" },
        { status: 500 }
      ),
    };
  }
  try {
    const token = authHeader.substring(7);
    jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    return { ok: true as const };
  } catch {
    return {
      ok: false as const,
      error: NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      ),
    };
  }
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""); // Remove leading/trailing dashes
}

// GET - Fetch all support models with pagination
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const query: any = { isDeleted: false };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [supportModels, total] = await Promise.all([
      SupportModel.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SupportModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: supportModels,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching support models:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch support models" },
      { status: 500 }
    );
  }
}

// POST - Create new support model
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const order = Number.parseInt(formData.get("order") as string) || 0;
    const features = JSON.parse(formData.get("features") as string || "[]");
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;
    const imageFile = formData.get("image") as File | null;
    const galleryFiles = formData.getAll("galleryImages") as File[];

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required" },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // Check if order already exists
    const existingOrder = await SupportModel.findOne({ order, isDeleted: false });
    if (existingOrder) {
      return NextResponse.json(
        { success: false, message: `A support model with order ${order} already exists` },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingModel = await SupportModel.findOne({ slug, isDeleted: false });
    if (existingModel) {
      return NextResponse.json(
        { success: false, message: "A support model with this name already exists" },
        { status: 400 }
      );
    }

    // Upload image
    const imageBytes = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageResult = await uploadToCloudinary(
      imageBuffer,
      `support-models/${slug}/main`
    );

    // Upload gallery images
    const galleryUrls: string[] = [];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await uploadToCloudinary(
            buffer,
            `support-models/${slug}/gallery-${i + 1}`
          );
          galleryUrls.push(result.secure_url);
        }
      }
    }

    // Create support model
    const supportModel = new SupportModel({
      title,
      shortDescription,
      description,
      image: imageResult.secure_url,
      gallery: galleryUrls,
      features,
      slug,
      status,
      order,
      seoTitle,
      seoDescription,
      seoKeywords,
    });

    await supportModel.save();

    return NextResponse.json({
      success: true,
      data: supportModel,
      message: "Support model created successfully",
    });
  } catch (error: any) {
    console.error("Error creating support model:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create support model",
      },
      { status: 500 }
    );
  }
}
