import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Service from "@/config/utils/admin/services/serviceSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Fetch active services for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build query for active services only
    const query: any = {
      status: "active",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    };

    const skip = (page - 1) * limit;

    // Get services and total count
    const [services, totalServices] = await Promise.all([
      Service.find(query)
        .select("-isDeleted -__v")
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Service.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalServices / limit);

    return NextResponse.json({
      success: true,
      data: services,
      pagination: {
        currentPage: page,
        totalPages,
        totalServices,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: "Services fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
