import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import SupportModel from "@/config/utils/admin/supportModel/supportModelSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Fetch active support models for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build query for active support models only
    const query: any = {
      status: "active",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    };

    const skip = (page - 1) * limit;

    // Get support models and total count
    const [supportModels, totalSupportModels] = await Promise.all([
      SupportModel.find(query)
        .select("-isDeleted -__v")
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SupportModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalSupportModels / limit);

    return NextResponse.json({
      success: true,
      data: supportModels,
      pagination: {
        currentPage: page,
        totalPages,
        totalSupportModels,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: "Support models fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching support models:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch support models",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
