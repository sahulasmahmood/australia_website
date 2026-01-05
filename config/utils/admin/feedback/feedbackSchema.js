import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    // Anonymous Option
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    // Contact Information
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // Feedback Content
    feedbackType: {
      type: String,
      enum: ["compliment", "suggestion", "concern", "complaint", "other"],
      required: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    resolution: {
      type: String,
      trim: true,
      default: "",
    },

    // Management
    status: {
      type: String,
      enum: ["new", "reviewed", "in-progress", "resolved"],
      default: "new",
    },

    // Admin Notes
    adminNotes: {
      type: String,
      trim: true,
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
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ feedbackType: 1 });
feedbackSchema.index({ submittedAt: -1 });

// Update lastUpdated on save
feedbackSchema.pre("save", function () {
  this.lastUpdated = new Date();
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
