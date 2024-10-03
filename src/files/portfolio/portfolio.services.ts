import mongoose from "mongoose";
import { IPagination, IResponse } from "../../constants";
import { IToken, queryConstructor } from "../../utils";
import { IPortfolio } from "./portfolio.interface";
import { portfolioMessages } from "./portfolio.messages";
import { PortfolioRepository } from "./portfolio.repository";
import DesignerService from "../user/designer/designer.service";

export class PortfolioService {
  // Create Portfolio
  static async createPortfolioService (
    portfolioPayload: IPortfolio,
    designerPayload: Partial<IToken & IPagination>,
  ): Promise<IResponse> {
    const designer = await DesignerService.getDesignerDetails(designerPayload);

    if (!designer?.success)
      return { success: false, msg: portfolioMessages.UNAUTHORIZED };

    const portfolio = await PortfolioRepository.createPortfolio({
      ...portfolioPayload, designerId: designerPayload._id 
    });

    if (!portfolio)
      return { success: false, msg: portfolioMessages.REQUEST_FAILURE };

    return {
      success: true,
      msg: portfolioMessages.REQUEST_SUCCESS,
      data: portfolio,
    };
  }

  // Fetch Portfolio
  static async fetchPortfolioService(portfolioPayload: Partial<IPortfolio>) {
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

    if (portfolios.length < 1)
      return { success: false, msg: portfolioMessages.FETCH_ERROR, data: [] };

    return {
      success: true,
      msg: portfolioMessages.FETCH_SUCCESS,
      data: portfolios,
    };
  }

  // Update Portfolio
  static async updatePortfolio(
    portfolioPayload: Partial<IPortfolio>,
    portfolioId: any,
  ) {
    const portfolio = await PortfolioRepository.updatePortfolioDetails(
      { _id: new mongoose.Types.ObjectId(portfolioId) },
      { $set: { ...portfolioPayload } },
    );

    if (!portfolio) return { success: false, msg: portfolioMessages.UPDATE_ERROR };

    return {
      success: true,
      msg: portfolioMessages.UPDATE_SUCCESS,
      portfolio,
    };
  }

  // Delete Portfolio
  static async deletePortfolio(portfolioPayload: any) {
    const portfolio = await PortfolioRepository.updatePortfolioDetails(
      { _id: new mongoose.Types.ObjectId(portfolioPayload) },
      { isDelete: true },
    );

    if (!portfolio) return { success: false, msg: portfolioMessages.DELETE_ERROR };

    return {
      success: true,
      msg: portfolioMessages.DELETE,
    };
  }

  // Fetch Designer's Portfolios
  static async fetchDesignerPortfolios(
    designerId: IToken,
    portfoliosPayload: Partial<IPortfolio>
  ): Promise<IResponse> {
    const { error, params, limit, skip, sort } = queryConstructor(
      portfoliosPayload,
      "createdAt",
      "Portfolio",
    );

    if (error) return { success: false, msg: error };

    const portfolios = await PortfolioRepository.fetchPortfolioByParams({
      ...params,
      designerId: designerId._id,
      limit,
      skip,
      sort,
    });

    if (!portfolios || portfolios.length === 0) {
      return { success: false, msg: portfolioMessages.FETCH_ERROR, data: [] };
    }

    return {
      success: true,
      msg: portfolioMessages.FETCH_SUCCESS,
      data: portfolios,
    };
  }
}

