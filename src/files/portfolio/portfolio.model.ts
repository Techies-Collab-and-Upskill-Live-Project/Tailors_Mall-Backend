import mongoose, { Schema } from 'mongoose';
import { IPortfolio } from './portfolio.interface'; // Import the IPortfolio interface

// Define the Portfolio schema
const PortfolioSchema: Schema<IPortfolio> = new Schema<IPortfolio>({
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
        required: true, 
    },
    tags: [{
        type: String,
    }],
    collaborators: [{
        type: String,
    }],
    images: [{
        type: String,
        required: true,
    }],
    videos: [{
        type: String, 
    }],
    photoGrid: {
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
}, {
    timestamps: true, 
});

// Export the Portfolio model
export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
