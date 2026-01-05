import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Feedback from "@/config/utils/admin/feedback/feedbackSchema";

// POST - Submit feedback from frontend
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { isAnonymous, name, email, phone, feedbackType, feedback, resolution } = body;

    // Validate required fields
    if (!feedbackType || !feedback) {
      return NextResponse.json(
        { success: false, error: "Feedback type and message are required" },
        { status: 400 }
      );
    }

    // Create new feedback
    const newFeedback = new Feedback({
      isAnonymous: isAnonymous || false,
      name: isAnonymous ? "Anonymous" : (name || ""),
      email: isAnonymous ? "" : (email || ""),
      phone: isAnonymous ? "" : (phone || ""),
      feedbackType,
      feedback,
      resolution: resolution || "",
      status: "new",
    });

    await newFeedback.save();

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback! We appreciate your input.",
      data: { id: newFeedback._id },
    });
  } catch (error: any) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
