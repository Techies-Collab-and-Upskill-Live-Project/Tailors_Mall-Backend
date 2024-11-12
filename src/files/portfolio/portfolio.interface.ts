import { ObjectId } from 'mongoose';

// Define the interface for a single content item
interface IContentItem {
    type: "image" | "video" | "text"; // Type of content
    data: string;                     // URL for image/video or text content
}

// Portfolio interface
export interface IPortfolio {
    _id?: any;
    name: string;
    category: any;
    description: string;
    tags?: string[];
    collaborators?: string[];
    content?: IContentItem[];         // Array to store mixed content (images, videos, text)
    images: string[];
    videos?: string[];
    photoGrid?: boolean;
    draft?: boolean;
    embedLink?: string;
    coverImage: string;
    designerId: ObjectId;             // Reference to the designer
    likes?: ObjectId[];               // Array of user IDs who liked the portfolio
    comments?: ObjectId[];            // Array of comment IDs
    isDelete: Boolean;
    createdAt?: Date;                 // Automatically added by Mongoose (optional)
    updatedAt?: Date;                 // Automatically added by Mongoose (optional)
}

