import mongoose, { Schema, model } from "mongoose";
import { IDesigner, IPortfolioItem } from "./designer.interface";

// Portfolio Schema
const PortfolioSchema = new Schema<IPortfolioItem>({
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  mediaURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Designer Schema
const DesignerSchema = new Schema<IDesigner>(
  {
    email: { 
      type: String,
      required: true, // Adding required to ensure consistency
    },
    googleId: String,
    facebookId: String,
    country: { 
      type: String,
    },
    phoneNumber: { 
      type: String,
    },
    password: { 
      type: String,
    },
    hearPlatformInfo: { 
      type: String,
    },
    serviceType: { 
      type: String,
    },
    experience: { 
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "beginner",
    },
    projectType: { 
      type: String,
      enum: ["one-off", "full-time"],
      default: "one-off",
    },
    workPreference: { 
      type: String,
      enum: ["in-person", "remote", "both"],
      default: "both",
    },
    fullName: { 
      type: String,
      required: true, // Adding required to ensure consistency
    },
    location: { 
      type: String,
    },
    tailoringSkill: { 
      type: String,
    },
    businessName: { 
      type: String,
    },
    description: { 
      type: String,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    socialMediaHandles: {
      facebook: { 
        type: String,
      },
      instagram: { 
        type: String,
      },
      twitter: { 
        type: String,
      },
      linkedin: { 
        type: String,
      },
    },
    portfolio: [PortfolioSchema],  // Array of PortfolioItem schemas
  },
  { timestamps: true }
);

const Designer = model<IDesigner>("Designer", DesignerSchema, "designer");
export default Designer;

