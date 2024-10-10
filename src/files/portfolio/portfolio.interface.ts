// src/files/portfolio/portfolio.interface.ts
import mongoose, { Document } from 'mongoose';

// Define the IPortfolio interface
export interface IPortfolio extends Document {
    name: string;                      // Portfolio name
    category: string;                  // Portfolio category
    description: string;               // Portfolio description
    tags: string[];                    // Array of tags associated with the portfolio
    collaborators: string[];           // Array of collaborators
    images: string[];                  // Array of image URLs
    videos?: string[];                 // Optional array of video URLs
    photoGrid?: boolean;               // Optional flag for photo grid display
    embedLink?: string;                // Optional embed link for external content
    coverImage: string;                // Cover image URL
    designerId: mongoose.Types.ObjectId; // Reference to the Designer model
}

