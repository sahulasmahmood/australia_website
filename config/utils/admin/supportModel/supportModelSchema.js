import mongoose from "mongoose";

const supportModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    seoKeywords: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
supportModelSchema.index({ status: 1, order: 1 });
supportModelSchema.index({ title: "text", description: "text" });

// Instance method to increment views
supportModelSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Instance method to increment bookings
supportModelSchema.methods.incrementBookings = function () {
  this.bookings += 1;
  return this.save();
};

// Static method to get active support models with pagination
supportModelSchema.statics.getActive = function (page = 1, limit = 6) {
  const query = { status: "active", isDeleted: false };

  const skip = (page - 1) * limit;

  return {
    supportModels: this.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    total: this.countDocuments(query),
  };
};

const SupportModel =
  mongoose.models.SupportModel ||
  mongoose.model("SupportModel", supportModelSchema);

export default SupportModel;
