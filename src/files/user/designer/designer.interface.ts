import { ObjectId } from "mongoose";
import { IUser } from "../general/general.interface";

// Portfolio item interface
export interface IPortfolioItem {
  mediaType: "image" | "video";
  mediaURL: string;
  description: string;
  createdAt: Date;
}

// Designer interface
export interface IDesigner extends IUser {
  id?: ObjectId;
  email: string;
  phoneNumber: string;
  password: string;
  country?: string;
  hearPlatformInfo?: string;
  googleId?: string;
  facebookId?: string;
  serviceType?: string;
  experience?: "beginner" | "intermediate" | "expert";
  projectType?: "one-off" | "full-time";
  workPreference?: "in-person" | "remote" | "both";
  fullName: string;
  location?: string;
  tailoringSkill?: string;
  businessName?: string;
  description?: string;
  image?: string;
  role?: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  socialMediaHandles?: ISocialMediaHandles;

  // New portfolio field
  portfolio: IPortfolioItem[];  // Array of portfolio items
}

// Social media handles interface
export interface ISocialMediaHandles {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  [key: string]: string | undefined; // Allows for additional social media platforms
}

