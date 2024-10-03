import mongoose from "mongoose";

export interface IPortfolio {
  _id: any;
  designerId: mongoose.Types.ObjectId; // Reference to the designer who owns this portfolio
  mediaType: "image" | "video"; // Type of media (image or video)
  mediaURL: string; // URL of the media
  description?: string; // Optional description for the portfolio item
  portfolioName: string; // Required portfolio name
  tags?: string[]; // Array of tags related to the portfolio
  categories?: string[]; // Array of categories for the portfolio
  collaborators?: string[]; // Optional array of collaborators
  isFeatured?: boolean; // Flag to mark if the portfolio item is featured
  isPublic?: boolean; // Flag to indicate if the portfolio item is public
  isDelete: boolean; // Flag for soft deletion
  createdAt?: Date; // Timestamp when the portfolio item was created
  updatedAt?: Date; // Timestamp when the portfolio item was last updated
}

