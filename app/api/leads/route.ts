import { NextRequest, NextResponse } from "next/server";
import Lead from "@/config/utils/admin/lead/leadSchema";
import connectDB from "@/config/models/connectDB";
import EmailSMTP from "@/config/utils/admin/smtp/emailSMTPSchema";
import { createSMTPTransporter } from "@/config/models/connectSMTP";

// POST - Create new lead from frontend forms (Contact Us)
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

    // Send email notifications
    try {
      await sendContactFormEmails(savedLead);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the lead creation if email fails
    }

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

// Function to send contact form emails
async function sendContactFormEmails(lead: any) {
  // Get SMTP configuration
  const smtpConfig = await EmailSMTP.findOne({
    id: "default",
    isActive: true,
  });

  if (!smtpConfig) {
    console.warn("SMTP configuration not found - contact form submitted without email notification");
    return;
  }

  // Send admin notification
  await sendAdminNotification(smtpConfig, lead);
  
  // Send customer confirmation
  await sendCustomerConfirmation(smtpConfig, lead);
}

// Function to send admin notification
async function sendAdminNotification(smtpConfig: any, lead: any) {
  const transporter = createSMTPTransporter(smtpConfig);
  const adminEmail = process.env.SMTP_FROM_EMAIL || smtpConfig.fromEmail;

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, primary 0%, #6BA32D 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        <p style="color: #E8F5E0; margin: 10px 0 0 0; font-size: 16px;">Elegant Care Service Admin Panel</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="border-left: 4px solid primary; padding-left: 20px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 10px 0;">Enquiry Information</h2>
          <div style="background-color: #F0F9E8; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background-color: primary; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">NEW ENQUIRY</span></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> <span style="background-color: #6BA32D; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.subject}</span></p>
            <p style="margin: 5px 0;"><strong>Priority:</strong> <span style="background-color: #4A8C1F; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.priority?.toUpperCase() || 'MEDIUM'}</span></p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}" style="color: primary;">${lead.email}</a></p>
            ${lead.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: primary;">${lead.phone}</a></p>` : ''}
          </div>
          
          <div>
            <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Submission Details</h3>
            <p style="margin: 10px 0;"><strong>Source:</strong> ${lead.source || 'Website'}</p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Message</h3>
          <div style="background-color: #F0F9E8; padding: 20px; border-radius: 8px; border-left: 4px solid primary;">
            <p style="margin: 0; line-height: 1.6; color: #1f2937;">${lead.message}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            This email was automatically generated from the Elegant Care Service website.<br>
            Lead ID: #${lead._id}<br>
            Received at: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: adminEmail,
    subject: `New Enquiry: ${lead.subject} - ${lead.firstName} ${lead.lastName}`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}

// Function to send customer confirmation
async function sendCustomerConfirmation(smtpConfig: any, lead: any) {
  if (!lead.email) {
    console.log("No customer email provided, skipping confirmation email");
    return;
  }

  const transporter = createSMTPTransporter(smtpConfig);

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, primary 0%, #6BA32D 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
        <p style="color: #E8F5E0; margin: 10px 0 0 0; font-size: 16px;">Elegant Care Service</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0;">Hi ${lead.firstName}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0;">
            Thank you for reaching out to Elegant Care Service. We have received your enquiry and our team will get back to you within 24-48 hours.
          </p>
        </div>

        <div style="background-color: #F0F9E8; padding: 20px; border-radius: 8px; border-left: 4px solid primary; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Your Enquiry Details:</h3>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${lead.subject}</p>
          <p style="margin: 5px 0;"><strong>Message:</strong></p>
          <p style="margin: 5px 0; color: #4b5563; font-style: italic;">"${lead.message}"</p>
        </div>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">What Happens Next?</h3>
          <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Our team will review your enquiry</li>
            <li>We'll contact you within 24-48 hours</li>
            <li>We'll discuss your needs and how we can help</li>
          </ul>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Why Choose Elegant Care Service?</h3>
          <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>NDIS registered provider</li>
            <li>Experienced and compassionate care team</li>
            <li>Personalized support plans</li>
            <li>Flexible service options</li>
            <li>Committed to your wellbeing</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            Best regards,<br>
            Elegant Care Service Team<br>
            Quality Care, Compassionate Support
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: lead.email,
    subject: "Thank You for Your Enquiry - Elegant Care Service",
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}
