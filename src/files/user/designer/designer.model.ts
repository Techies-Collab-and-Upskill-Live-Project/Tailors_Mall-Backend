import mongoose, { Schema, model } from "mongoose";
import { IDesigner, PortfolioItem } from "./designer.interface";

const PortfolioSchema = new Schema<PortfolioItem>({
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

const DesignerSchema = new Schema<IDesigner>(
  {
    email: { 
      type: String,
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
      type: String 
    },
    experience: { 
      type: String, 
      enum: ["beginner", "intermediate", "expert"],
      default: "beginner"
    },
    projectType: { 
      type: String, 
      enum: ["one-off", "full-time"],
      default: "one-off"
    },
    workPreference: { 
      type: String, 
      enum: ["in-person", "remote", "both"],
      default: "both"
    },
    fullName: { 
      type: String 
    },
    location: { 
      type: String 
    },
    tailoringSkill: { 
      type: String 
    },
    businessName: { 
      type: String 
    },
    description: { 
      type: String 
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
        type: String 
      },
      instagram: { 
        type: String 
      },
      twitter: { 
        type: String 
      },
      linkedin: { 
        type: String
      },
    },
    portfolio: [PortfolioSchema],  // <-- New portfolio field
  },
  { timestamps: true },
);

const designer = model<IDesigner>("Designer", DesignerSchema, "designer");
export default designer;

