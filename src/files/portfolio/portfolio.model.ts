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
		// required: true,
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
    timestamps: true, 
});

// Export the Portfolio model
const portfolio = model<IPortfolio>("Portfolio", PortfolioSchema, "portfolio");
export default portfolio;
