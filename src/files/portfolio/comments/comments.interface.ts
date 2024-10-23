import { ObjectId } from 'mongoose';

// Comment interface
export interface IComment {
    text: string;
    userId: ObjectId; // Reference to the User who made the comment
    portfolioId: ObjectId; // Reference to the Portfolio being commented on
    createdAt?: Date; // Automatically added by Mongoose (optional)
    updatedAt?: Date; // Automatically added by Mongoose (optional)
}
