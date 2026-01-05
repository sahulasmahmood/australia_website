import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // Contact Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },

    // Enquiry Information
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Lead Management
    status: {
      type: String,
      enum: ["new", "contacted", "consulting", "confirmed", "completed", "cancelled"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Lead Source Tracking
    source: {
      type: String,
      enum: ["website", "whatsapp", "phone", "referral"],
      default: "website",
    },

    // Additional Fields
    estimatedCost: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },

    // Review System
    reviewLink: {
      type: String,
      default: "",
    },
    reviewToken: {
      type: String,
      default: "",
    },

    // Timestamps
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ priority: 1 });
leadSchema.index({ subject: 1 });
leadSchema.index({ submittedAt: -1 });

// Update lastUpdated on save
leadSchema.pre("save", function () {
  this.lastUpdated = new Date();
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
