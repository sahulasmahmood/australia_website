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
    .replace(/(^-|-$)/g, "");
}

// PUT - Update support model
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();
    const { id } = await params;

    const supportModel = await SupportModel.findOne({ _id: id, isDeleted: false });
    if (!supportModel) {
      return NextResponse.json(
        { success: false, message: "Support model not found" },
        { status: 404 }
      );
    }

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
    const existingImage = formData.get("existingImage") as string;
    const galleryFiles = formData.getAll("galleryImages") as File[];
    
    // Get existing gallery URLs from form data
    const existingGallery: string[] = [];
    let index = 0;
    while (formData.has(`existingGallery[${index}]`)) {
      const url = formData.get(`existingGallery[${index}]`) as string;
      if (url) existingGallery.push(url);
      index++;
    }

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required" },
        { status: 400 }
      );
    }

    // Check if order already exists (excluding current item)
    const existingOrder = await SupportModel.findOne({
      order,
      _id: { $ne: id },
      isDeleted: false
    });
    if (existingOrder) {
      return NextResponse.json(
        { success: false, message: `A support model with order ${order} already exists` },
        { status: 400 }
      );
    }

    // Generate new slug if title changed
    const newSlug = generateSlug(title);
    if (newSlug !== supportModel.slug) {
      const existingModel = await SupportModel.findOne({
        slug: newSlug,
        _id: { $ne: id },
        isDeleted: false,
      });
      if (existingModel) {
        return NextResponse.json(
          { success: false, message: "A support model with this name already exists" },
          { status: 400 }
        );
      }
    }

    // Handle image upload
    let imageUrl = existingImage || supportModel.image;
    if (imageFile && imageFile.size > 0) {
      const imageBytes = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imageResult = await uploadToCloudinary(
        imageBuffer,
        `support-models/${newSlug}/main`
      );
      imageUrl = imageResult.secure_url;
    }

    // Handle gallery images
    const galleryUrls: string[] = [...existingGallery];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await uploadToCloudinary(
            buffer,
            `support-models/${newSlug}/gallery-${Date.now()}-${i + 1}`
          );
          galleryUrls.push(result.secure_url);
        }
      }
    }

    // Update support model
    supportModel.title = title;
    supportModel.shortDescription = shortDescription;
    supportModel.description = description;
    supportModel.image = imageUrl;
    supportModel.gallery = galleryUrls;
    supportModel.features = features;
    supportModel.slug = newSlug;
    supportModel.status = status;
    supportModel.order = order;
    supportModel.seoTitle = seoTitle;
    supportModel.seoDescription = seoDescription;
    supportModel.seoKeywords = seoKeywords;

    await supportModel.save();

    return NextResponse.json({
      success: true,
      data: supportModel,
      message: "Support model updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating support model:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update support model",
      },
      { status: 500 }
    );
  }
}

// DELETE - Hard delete support model
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin(request);
  if (!admin.ok) return admin.error!;

  try {
    await connectDB();
    const { id } = await params;

    const supportModel = await SupportModel.findOne({ _id: id, isDeleted: false });
    if (!supportModel) {
      return NextResponse.json(
        { success: false, message: "Support model not found" },
        { status: 404 }
      );
    }

    // Hard delete
    await SupportModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Support model deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting support model:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete support model" },
      { status: 500 }
    );
  }
}
