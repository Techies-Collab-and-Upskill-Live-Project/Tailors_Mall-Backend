import mongoose, { Schema } from 'mongoose';
import { IComment } from './comment.interface'; // Import your interface if you have one

// Define the Comment schema
const CommentSchema: Schema<IComment> = new Schema<IComment>({
    text: {
        type: String,
        required: true, // Comment text is required
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userType', // Reference to the User model
        required: true, // The user who made the comment
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio', // Reference to the Portfolio model
        required: true, // The portfolio being commented on
    },
    userType: {
      type: String,
      required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Comment model
export default mongoose.model<IComment>('Comment', CommentSchema);
