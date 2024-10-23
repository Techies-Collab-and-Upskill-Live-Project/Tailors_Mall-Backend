import { ObjectId } from 'mongoose';

// Portfolio interface
export interface IPortfolio {
    name: string;
    category: string;
    description: string;
    tags?: string[];
    collaborators?: string[];
    images: string[];
    videos?: string[];
    photoGrid?: boolean;
    embedLink?: string;
    coverImage: string;
    designerId: ObjectId; // Reference to the designer
    likes?: ObjectId[]; // Array of user IDs who liked the portfolio
    comments?: ObjectId[]; // Array of comment IDs
    createdAt?: Date; // Automatically added by Mongoose (optional)
    updatedAt?: Date; // Automatically added by Mongoose (optional)
}
