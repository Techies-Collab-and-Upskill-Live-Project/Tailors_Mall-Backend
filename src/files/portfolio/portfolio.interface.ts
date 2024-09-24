import { Document, ObjectId } from 'mongoose';

export interface IPortfolioItem extends Document {
  designerId: ObjectId;
  mediaType: 'image' | 'video';
  mediaURL: string;
  description?: string;
  tags?: string[];
  categories?: string[];
  views: number;
  likes: number;
  comments: IComment[];
  isFeatured: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalEngagement?: number; // Virtual field (views + likes)
}

export interface IComment {
  userId: ObjectId;
  commentText: string;
  createdAt: Date;
}

