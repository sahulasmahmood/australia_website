import { NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import SupportModel from "@/config/utils/admin/supportModel/supportModelSchema";

// GET - Fetch single support model by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    // Find support model by slug
    const supportModel = await SupportModel.findOne({
      slug,
      status: "active",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    })
      .select("-isDeleted -__v")
      .lean();

    if (!supportModel) {
      return NextResponse.json(
        {
          success: false,
          message: "Support model not found",
        },
        { status: 404 }
      );
    }

    // Increment view count
    await SupportModel.findByIdAndUpdate(supportModel._id, {
      $inc: { views: 1 },
    });

    return NextResponse.json({
      success: true,
      data: supportModel,
      message: "Support model fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching support model:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch support model",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
