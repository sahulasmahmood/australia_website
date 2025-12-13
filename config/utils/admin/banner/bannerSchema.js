import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    // For home page - support multiple images (carousel)
    images: {
      type: [String],
      default: [],
    },
    mobileImage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

bannerSchema.index({ pageKey: 1, status: 1 });
bannerSchema.index({ title: "text", pageKey: "text" });

const Banner =
  mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
