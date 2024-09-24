import mongoose, { Types } from "mongoose";
import PortfolioItem from "./portfolio.model"; // Import the Portfolio model
import { IPortfolioItem } from "./portfolio.interface";
import { CustomError } from "../../utils/error"; // Assuming you have a CustomError for error handling
import { IResponse } from "../../constants";
import { queryConstructor } from "../../utils"; // For query handling

class PortfolioService {
  // Create a new portfolio item
  async createPortfolioItem(portfolioData: IPortfolioItem): Promise<IPortfolioItem> {
    try {
      const newPortfolioItem = new PortfolioItem(portfolioData);
      return await newPortfolioItem.save();
    } catch (error) {
      throw new CustomError("Failed to create portfolio item", 500);
    }
  }

  // Get all portfolio items with pagination and filtering
  async getAllPortfolioItems(query: any, pagination: { page: number; limit: number }): Promise<IResponse> {
    try {
      const { page, limit } = pagination;
      const filter = queryConstructor(query); // Assuming you have a query constructor to handle filters
      const portfolioItems = await PortfolioItem.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('designerId', 'name') // Populate designer details if needed
        .exec();
      const totalItems = await PortfolioItem.countDocuments(filter);

      return {
        data: portfolioItems,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new CustomError("Failed to retrieve portfolio items", 500);
    }
  }

  // Get a portfolio item by ID
  async getPortfolioItemById(id: string): Promise<IPortfolioItem | null> {
    try {
      const portfolioItem = await PortfolioItem.findById(id).populate('designerId', 'name').exec();
      if (!portfolioItem) {
        throw new CustomError("Portfolio item not found", 404);
      }
      return portfolioItem;
    } catch (error) {
      throw new CustomError("Failed to retrieve portfolio item", 500);
    }
  }

  // Update a portfolio item
  async updatePortfolioItem(id: string, updateData: Partial<IPortfolioItem>): Promise<IPortfolioItem | null> {
    try {
      const updatedPortfolioItem = await PortfolioItem.findByIdAndUpdate(id, updateData, { new: true }).exec();
      if (!updatedPortfolioItem) {
        throw new CustomError("Portfolio item not found", 404);
      }
      return updatedPortfolioItem;
    } catch (error) {
      throw new CustomError("Failed to update portfolio item", 500);
    }
  }

  // Delete a portfolio item
  async deletePortfolioItem(id: string): Promise<void> {
    try {
      const result = await PortfolioItem.findByIdAndDelete(id).exec();
      if (!result) {
        throw new CustomError("Portfolio item not found", 404);
      }
    } catch (error) {
      throw new CustomError("Failed to delete portfolio item", 500);
    }
  }
}

export default new PortfolioService();

