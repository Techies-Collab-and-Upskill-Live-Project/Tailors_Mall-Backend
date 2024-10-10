// src/files/portfolio/portfolio.model.ts
import mongoose, { Schema } from 'mongoose';
import { IPortfolio } from './portfolio.interface'; // Import the IPortfolio interface

// Define the Portfolio schema
const PortfolioSchema: Schema = new Schema<IPortfolio>({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, // Ensure description is included
    },
    tags: [{
        type: String,
    }],
    collaborators: [{
        type: String,
    }],
    images: [{
        type: String,
        required: true, // Required images
    }],
    videos: [{
        type: String, // Optional videos field
    }],
    photoGrid: {
        type: Boolean,
        default: false, // Default value for photoGrid
    },
    embedLink: {
        type: String, // Optional embed link for external content
    },
    coverImage: {
        type: String,
        required: true, // Required cover image
    },
    designerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designer", // Reference to the Designer model
        required: true,  // Ensure designerId is provided
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Portfolio model
export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

