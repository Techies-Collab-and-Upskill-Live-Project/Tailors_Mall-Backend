import mongoose from "mongoose";
import pagination, { IPagination } from "../../constants";
import { IPortfolio } from "./portfolio.interface";
import { portfolio as Portfolio } from "./portfolio.model";
const { LIMIT, SKIP, SORT } = pagination;

export class PortfolioRepository {
  // Create a new portfolio item
  static async createPortfolio(portfolioPayload: IPortfolio): Promise<IPortfolio> {
    return await Portfolio.create(portfolioPayload);
  }

  // Fetch multiple portfolio items based on params with pagination
  static async fetchPortfolioByParams(
    portfolioPayload: Partial<IPortfolio & IPagination>,
  ): Promise<IPortfolio[]> {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = portfolioPayload;

    const portfolios = await Portfolio.find({
      ...restOfPayload,
      isDelete: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return portfolios;
  }

  // Fetch Portfolio by ID
  static async fetchPortfolioById(
    portfolioId: mongoose.Types.ObjectId,
  ): Promise<IPortfolio | null> {
    return await Portfolio.findById(portfolioId);
  }

  // Update Portfolio by ID
  static async updatePortfolioById(
    portfolioId: mongoose.Types.ObjectId,
    updatePayload: Partial<IPortfolio>,
  ): Promise<IPortfolio | null> {
    return await Portfolio.findByIdAndUpdate(portfolioId, updatePayload, {
      new: true,
      runValidators: true,
    });
  }

  // Delete Portfolio by ID
  static async deletePortfolioById(
    portfolioId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await Portfolio.findByIdAndDelete(portfolioId);
  }
}

