import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Feedback from "@/config/utils/admin/feedback/feedbackSchema";

// GET - Fetch all feedback with pagination and filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const feedbackType = searchParams.get("feedbackType");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (feedbackType && feedbackType !== "all") query.feedbackType = feedbackType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { feedback: { $regex: search, $options: "i" } },
      ];
    }

    const [feedbacks, total] = await Promise.all([
      Feedback.find(query).sort({ submittedAt: -1 }).skip(skip).limit(limit),
      Feedback.countDocuments(query),
    ]);

    // Get stats
    const [totalCount, newCount, reviewedCount, resolvedCount, complaintCount] = await Promise.all([
      Feedback.countDocuments({}),
      Feedback.countDocuments({ status: "new" }),
      Feedback.countDocuments({ status: "reviewed" }),
      Feedback.countDocuments({ status: "resolved" }),
      Feedback.countDocuments({ feedbackType: "complaint" }),
    ]);

    return NextResponse.json({
      success: true,
      data: feedbacks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
      stats: {
        total: totalCount,
        new: newCount,
        reviewed: reviewedCount,
        resolved: resolvedCount,
        complaints: complaintCount,
      },
    });
  } catch (error: any) {
    console.error("Fetch feedback error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

// PUT - Update feedback
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, status, adminNotes } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      _id,
      {
        status,
        adminNotes,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (error: any) {
    console.error("Update feedback error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

// DELETE - Delete feedback
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete feedback error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
