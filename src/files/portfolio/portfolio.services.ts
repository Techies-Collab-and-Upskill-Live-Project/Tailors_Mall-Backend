import DesignerService from "../user/designer/designer.service";
import { IToken, queryConstructor } from "../../utils";
import { IPortfolio } from "./portfolio.interface";
import { portfolioMessages } from "./portfolio.messages";
import { PortfolioRepository } from "./portfolio.repository";
import mongoose from "mongoose";
import { IResponse } from "../../constants";

export class PortfolioService {
  
  // Create Portfolio
  static async createPortfolioService(
    tokenData: IToken,
    portfolioPayload: Partial<IPortfolio>,
  ): Promise<IResponse> {
    try {
      if (!portfolioPayload || !portfolioPayload.mediaType || !portfolioPayload.mediaURL) {
        return { success: false, msg: portfolioMessages.CREATE_ERROR };
      }

      // Check if designer exists
      const designerExists = await DesignerService.fetchDesignerById(tokenData.id);
      if (!designerExists) {
        return { success: false, msg: portfolioMessages.DESIGNER_NOT_FOUND };
      }

      // Create portfolio
      const portfolio = await PortfolioRepository.createPortfolio({
        _id: new mongoose.Types.ObjectId(), // Ensure _id is provided
        designerId: tokenData.id,
        ...portfolioPayload,
      });

      return {
        success: true,
        msg: portfolioMessages.CREATE_SUCCESS,
        data: portfolio,
      };
    } catch (error) {
      return { success: false, msg: portfolioMessages.CREATE_ERROR };
    }
  }

  // Fetch Portfolio
  static async fetchPortfolioService(portfolioPayload: Partial<IPortfolio>): Promise<IResponse> {
    const { error, params, limit, skip, sort } = queryConstructor(
      portfolioPayload,
      "createdAt",
      "Portfolio",
    );

    if (error) return { success: false, msg: error };

    const portfolios = await PortfolioRepository.fetchPortfolioByParams({
      ...params,
      limit,
      skip,
      sort,
    });

    if (!portfolios || portfolios.length < 1) {
      return { success: false, msg: portfolioMessages.FETCH_ERROR, data: [] };
    }

    return {
      success: true,
      msg: portfolioMessages.FETCH_SUCCESS,
      data: portfolios,
    };
  }

  // Fetch Portfolio by ID
  static async fetchPortfolioByIdService(portfolioId: mongoose.Types.ObjectId): Promise<IResponse> {
    const portfolio = await PortfolioRepository.fetchPortfolioById(portfolioId);

    if (!portfolio) {
      return { success: false, msg: portfolioMessages.NOT_FOUND };
    }

    return {
      success: true,
      msg: portfolioMessages.FETCH_SUCCESS,
      data: portfolio,
    };
  }

  // Update Portfolio
  static async updatePortfolioService(
    tokenData: IToken,
    portfolioId: mongoose.Types.ObjectId,
    portfolioPayload: Partial<IPortfolio>,
  ): Promise<IResponse> {
    try {
      const portfolio = await PortfolioRepository.fetchPortfolioById(portfolioId);

      if (!portfolio) {
        return { success: false, msg: portfolioMessages.NOT_FOUND };
      }

      if (portfolio.designerId.toString() !== tokenData.id.toString()) {
        return { success: false, msg: portfolioMessages.UNAUTHORIZED };
      }

      const updatedPortfolio = await PortfolioRepository.updatePortfolioById(portfolioId, {
        ...portfolioPayload,
      });

      return {
        success: true,
        msg: portfolioMessages.UPDATE_SUCCESS,
        data: updatedPortfolio,
      };
    } catch (error) {
      return { success: false, msg: portfolioMessages.UPDATE_ERROR };
    }
  }

  // Delete Portfolio
  static async deletePortfolioService(
    tokenData: IToken,
    portfolioId: mongoose.Types.ObjectId,
  ): Promise<IResponse> {
    try {
      const portfolio = await PortfolioRepository.fetchPortfolioById(portfolioId);

      if (!portfolio) {
        return { success: false, msg: portfolioMessages.NOT_FOUND };
      }

      if (portfolio.designerId.toString() !== tokenData.id.toString()) {
        return { success: false, msg: portfolioMessages.UNAUTHORIZED };
      }

      await PortfolioRepository.deletePortfolioById(portfolioId);

      return {
        success: true,
        msg: portfolioMessages.DELETE_SUCCESS,
      };
    } catch (error) {
      return { success: false, msg: portfolioMessages.DELETE_ERROR };
    }
  }
}

