import mongoose, { Schema, model } from "mongoose";
import { IPortfolio } from "./portfolio.interface";

// Portfolio Schema
const PortfolioSchema = new Schema<IPortfolio>(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },
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
      maxlength: 1000, // Description length should be less than 1000 characters
      default: "",
    },
    portfolioName: { // New field for portfolio name
      type: String,
      required: true, // Make it required
    },
    collaborators: { // New optional field for collaborators
      type: [String], // Array of strings
      default: [], // Default is an empty array
    },
    tags: {
      type: [String], // Array of tags
      default: [], // Default is an empty array
    },
    categories: {
      type: [String], // Array of categories
      default: [], // Default is an empty array
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Indexes for faster search by designerId and isPublic (optional)
PortfolioSchema.index({ designerId: 1 });
PortfolioSchema.index({ isPublic: 1 });

// Creating the Portfolio model
const Portfolio = model<IPortfolio>("Portfolio", PortfolioSchema, "portfolio");

export default Portfolio;

