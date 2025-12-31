import { NextRequest, NextResponse } from "next/server";
import Lead from "@/config/utils/admin/lead/leadSchema";
import connectDB from "@/config/models/connectDB";

// POST - Create new lead from frontend forms
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Set default values if not provided
    const leadData = {
      ...body,
      status: body.status || "new",
      priority: body.priority || "medium",
      source: body.source || "website",
      submittedAt: new Date(),
    };
    
    const newLead = new Lead(leadData);
    const savedLead = await newLead.save();

    return NextResponse.json({
      success: true,
      data: savedLead,
      message: "Your enquiry has been submitted successfully!",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    
    // Handle validation errors from mongoose
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: "Please check all required fields are filled correctly" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
