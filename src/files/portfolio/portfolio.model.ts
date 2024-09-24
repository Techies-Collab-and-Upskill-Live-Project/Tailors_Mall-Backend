import mongoose, { Schema, Document } from 'mongoose';

// Define the Portfolio schema
const portfolioSchema: Schema = new mongoose.Schema(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designer',
      required: true,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    mediaURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000, // You can define a limit for the description length
    },
    tags: {
      type: [String], // An array of strings for tagging the portfolio item
    },
    categories: {
      type: [String], // An array of categories for classification
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Referencing the User model
        },
        commentText: {
          type: String,
          maxlength: 500, // Maximum length for a comment
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true, // If false, the portfolio is private
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create a virtual field for total engagement (views + likes)
portfolioSchema.virtual('totalEngagement').get(function () {
  return this.views + this.likes;
});

// Pre-save hook to update the `updatedAt` field
portfolioSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Export the Portfolio model
const PortfolioItem = mongoose.model<Document & any>('PortfolioItem', portfolioSchema);

export default PortfolioItem;

