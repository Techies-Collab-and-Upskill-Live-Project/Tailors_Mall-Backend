import mongoose, { Schema, model } from "mongoose";
import { IDesigner } from "./designer.interface";

const DesignerSchema = new Schema<IDesigner>(
  {
    email: { 
      type: String, 
      // required: true 
    },
    googleId: String,
    facebookId: String,
    country: { 
      type: String, 
      // required: true 
    },
    phoneNumber: { 
      type: String, 
      // required: true 
    },
    password: { 
      type: String, 
      // required: true 
    },
    hearPlatformInfo: { 
      type: String, 
      // required: true 
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
  },
  { timestamps: true },
);

const designer = model<IDesigner>("Designer", DesignerSchema, "designer");
export default designer;