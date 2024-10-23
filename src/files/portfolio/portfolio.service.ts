import mongoose from "mongoose";
import { IToken, queryConstructor } from "../../utils";
import { IPortfolio } from "./portfolio.interface";
import { portfolioMessage } from "./portfolio.messages";
import PortfolioRepository from "./portfolio.repository";
import Portfolio from "./portfolio.model";

export class PortfolioService {
  static async createPortfolio(portfolioPayload: IPortfolio, user: any) {
    const portfolio = await PortfolioRepository.createPortfolio({
      ...portfolioPayload,
      designerId: user,
    });

    if (!portfolio)
      return { success: false, msg: portfolioMessage.REQUEST_FAILURE }

    return {
      success: true,
      msg: portfolioMessage.REQUEST_SUCCESS,
      data: portfolio,
    }
  }

  static async fetchPortfolioService(portfolioPayload: Partial<IPortfolio>, userId: any) {
    const { error, params, limit, skip, sort } = queryConstructor(
      portfolioPayload,
      "createdAt",
      "Portfolio",
    )

    if (error) return { success: false, msg: error }

    const portfolio = await PortfolioRepository.fetchPortfolioByParams({
      designerId: userId,
      ...params,
      limit,
      skip,
      sort,
    })

    if (portfolio.length < 1)
      return { success: false, msg: portfolioMessage.FETCH_ERROR, data: [] }

    return {
      success: true,
      msg: portfolioMessage.FETCH_SUCCESS,
      data: portfolio,
    }
  }

  static async updatePortfolio(
    portfolioPayload: Partial<IPortfolio>,
    portfolioId: any,
    userId: any,
  ) {
    const portfolio = await PortfolioRepository.updatePortfolioDetails(
      { _id: new mongoose.Types.ObjectId(portfolioId), designerId: userId, isDelete: false },
      { $set: { ...portfolioPayload } },
    )

    if (!portfolio) return { success: false, msg: portfolioMessage.UPDATE_ERROR }

    return {
      success: true,
      msg: portfolioMessage.UPDATE_SUCCESS,
      portfolio,
    }
  }

  static async deletePortfolio(portfolioPayload: any) {
    const portfolio = await PortfolioRepository.updatePortfolioDetails(
      { _id: new mongoose.Types.ObjectId(portfolioPayload) },
      { isDelete: true },
    )
    if (!portfolio) return { success: false, msg: portfolioMessage.DELETE_ERROR }

    return {
      success: true,
      msg: portfolioMessage.DELETE,
    }
  }

  // Like/Unlike a portfolio project
  static async toggleLikePortfolio(params: any, userId: any) {
    const { portfolioId } = params; 
    
    // Find the portfolio by ID
    const portfolio = await Portfolio.findById({ _id: portfolioId });

    if (!portfolio) return { success: false, msg: portfolioMessage.FETCH_ERROR };

    // Check if the user has already liked the portfolio
    const isLiked = portfolio.likes!.includes(userId);

    if (isLiked) {
      // Unlike the portfolio (remove user ID from likes array)
      portfolio.likes = portfolio.likes!.filter((id: any) => id.toString() !== userId.toString());
      await portfolio.save();

      return {
        success: true,
        msg: portfolioMessage.UN_LIKED,
      }
    } else {
      // Like the portfolio (add user ID to likes array)
      portfolio.likes!.push(userId);
      await portfolio.save();

      return {
        success: true,
        msg: portfolioMessage.LIKED,
      }
    }
  };
}