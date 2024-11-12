import mongoose, { Schema, model } from 'mongoose';
import { IPortfolio } from './portfolio.interface'; // Import the IPortfolio interface

// Define the Portfolio schema
const PortfolioSchema = new Schema<IPortfolio>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    required: true, 
  },
  tags: [{
    type: String,
  }],
  collaborators: [{
    type: String,
  }],
  
  // New 'content' field to store mixed content types in order
  content: [
    {
      type: { type: String, enum: ["image", "video", "text"], required: true },
      data: { type: String, required: true },
    }
  ],

  // Separated images and videos arrays for backend use
  images: [{
    type: String,
  }],
  videos: [{
    type: String, 
  }],
  
  photoGrid: {
    type: Boolean,
    default: false,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  embedLink: {
    type: String,
  },
  coverImage: {
    type: String,
    required: true,
  },
  designerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designer", 
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for likes
  }],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        refPath: "comments.userType",
      },
      userType: {
        type: String,
      },
      comment: String,
      postedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  isDelete: { 
    type: Boolean, 
    default: false 
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the Portfolio model
const portfolio = model<IPortfolio>("Portfolio", PortfolioSchema, "portfolio");
export default portfolio;

