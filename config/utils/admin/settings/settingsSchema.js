import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      default: "default",
      index: { unique: true },
    },
    siteName: {
      type: String,
      required: true,
      trim: true,
      default: "Elegant Care Service",
    },
    siteTagline: {
      type: String,
      trim: true,
      default: "Quality NDIS Support Services",
    },
    logo: {
      type: String,
      trim: true,
      default: null,
    },
    favicon: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
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

settingsSchema.index({ isActive: 1 });

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

// Default settings data for Elegant Care Service
const defaultSettingsData = {
  id: "default",
  siteName: "Elegant Care Service",
  siteTagline: "Quality NDIS Support Services",
  logo: null,
  favicon: null,
  isActive: true,
  lastUpdated: new Date(),
};

// Auto-seed function
const autoSeedSettings = async () => {
  try {
    const count = await Settings.countDocuments();
    if (count === 0) {
      await Settings.create(defaultSettingsData);
      console.log("✅ Settings database auto-seeded with default data");
    }
  } catch (error) {
    console.error("❌ Error auto-seeding settings data:", error);
  }
};

// Auto-seed when model is first loaded
if (mongoose.connection.readyState === 1) {
  autoSeedSettings();
} else {
  mongoose.connection.once("open", autoSeedSettings);
}

export default Settings;
