import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Testimonial from "@/config/utils/admin/testimonial/testimonialSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Maximum number of testimonials to show on homepage
const MAX_TESTIMONIALS = 8;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get only published testimonials, sorted by rating (highest first) and date (most recent)
    // Limit to top 8 best testimonials for optimal user experience
    const testimonials = await Testimonial.find({ status: "published" })
      .sort({ rating: -1, date: -1, createdAt: -1 })
      .limit(MAX_TESTIMONIALS)
      .lean();

    return NextResponse.json({
      success: true,
      data: testimonials,
      meta: {
        total: testimonials.length,
        limit: MAX_TESTIMONIALS,
      },
    });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
