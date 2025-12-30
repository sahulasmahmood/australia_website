import { NextRequest, NextResponse } from "next/server";
import SEO from "@/config/utils/admin/seo/seoSchema";
import connectDB from "@/config/models/connectDB";

// GET - Fetch all SEO data
export async function GET() {
  try {
    await connectDB();
    
    // Check if SEO data exists, if not create default data
    let seoData = await SEO.find({}).sort({ lastUpdated: -1 });
    
    if (seoData.length === 0) {
      // Create default SEO data for Elegant Care Service
      const defaultSEOData = [
        {
          id: "home",
          pageName: "Home Page",
          title: "Elegant Care Service - Quality NDIS Support Services in Australia",
          description: "Elegant Care Service provides compassionate NDIS support services across Australia. Expert care workers, personalized support plans, and 24/7 assistance for people with disabilities.",
          keywords: "NDIS support services, disability care Australia, support workers, NDIS provider, quality care services, disability support, home care, community access",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "about",
          pageName: "About Us",
          title: "About Elegant Care Service - Your Trusted NDIS Support Provider",
          description: "Learn about Elegant Care Service, a trusted NDIS registered provider offering quality disability support services. Our experienced team is dedicated to empowering individuals with disabilities.",
          keywords: "about elegant care, NDIS registered provider, disability support team, quality care provider, experienced support workers, trusted NDIS service",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "services",
          pageName: "Services Page",
          title: "NDIS Support Services - Personal Care, Community Access & More",
          description: "Explore our comprehensive NDIS support services including personal care, community access, supported independent living, and specialized disability support tailored to your needs.",
          keywords: "NDIS services, personal care, community access, supported independent living, disability support services, respite care, daily living assistance",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "support-model",
          pageName: "Support Model",
          title: "Our Support Model - Person-Centered NDIS Care Approach",
          description: "Discover our person-centered support model designed to empower NDIS participants. We focus on individual goals, independence, and quality of life improvements.",
          keywords: "support model, person-centered care, NDIS approach, individual goals, independence support, quality care model, participant empowerment",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "ndis",
          pageName: "NDIS Information",
          title: "NDIS Information - Understanding Your NDIS Plan & Support",
          description: "Learn about the NDIS, how to access support services, understanding your NDIS plan, and how Elegant Care Service can help you achieve your goals.",
          keywords: "NDIS information, NDIS plan, disability support scheme, NDIS access, understanding NDIS, NDIS funding, support coordination",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "feedback",
          pageName: "Feedback",
          title: "Feedback - Share Your Experience with Elegant Care Service",
          description: "We value your feedback! Share your compliments, suggestions, or concerns about our NDIS support services. Your input helps us improve and deliver better care.",
          keywords: "feedback, customer feedback, service feedback, NDIS feedback, compliments, suggestions, concerns, service improvement, client feedback",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "contact",
          pageName: "Contact Us",
          title: "Contact Elegant Care Service - Get NDIS Support Today",
          description: "Contact Elegant Care Service for NDIS support services. Our friendly team is available 24/7 to discuss your care needs and create a personalized support plan.",
          keywords: "contact elegant care, NDIS inquiry, support services contact, 24/7 care support, NDIS consultation, get support, care inquiry",
          lastUpdated: new Date(),
          isActive: true,
        },
      ];

      // Use bulkWrite with upsert to prevent duplicates
      const bulkOps = defaultSEOData.map(item => ({
        updateOne: {
          filter: { id: item.id },
          update: { $setOnInsert: item },
          upsert: true
        }
      }));

      await SEO.bulkWrite(bulkOps);
      seoData = await SEO.find({}).sort({ lastUpdated: -1 });
      console.log("✅ SEO data initialized for Elegant Care Service");
    }
    
    return NextResponse.json({
      success: true,
      data: seoData,
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch SEO data" },
      { status: 500 }
    );
  }
}

// PUT - Update SEO data
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, title, description, keywords } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedSEO = await SEO.findOneAndUpdate(
      { id },
      {
        title,
        description,
        keywords: keywords || "",
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedSEO) {
      return NextResponse.json(
        { success: false, error: "SEO page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSEO,
      message: "SEO data updated successfully",
    });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update SEO data" },
      { status: 500 }
    );
  }
}
