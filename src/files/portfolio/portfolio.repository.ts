import pagination, { IPagination } from "../../constants";
import { IPortfolio } from "./portfolio.interface";
import { portfolio as Portfolio } from "./portfolio.model";
const { LIMIT, SKIP, SORT } = pagination;

export class PortfolioRepository {
  // Create a new portfolio item
  static async createPortfolio(portfolioPayload: IPortfolio): Promise<IPortfolio> {
    return await Portfolio.create(portfolioPayload);
  }

  // Fetch a portfolio item based on criteria
  static async fetchPortfolio(
    portfolioPayload: Partial<IPortfolio> | Record<any, any>,
    select: Partial<Record<keyof IPortfolio, number | Boolean | object>>,
  ): Promise<Partial<IPortfolio> | null> {
    const portfolio: Awaited<IPortfolio | null> = await Portfolio.findOne(
      {
        ...portfolioPayload,
      },
      select,
    );
    return portfolio;
  }

  // Fetch multiple portfolio items based on params with pagination
  static async fetchPortfolioByParams(
    portfolioPayload: Partial<IPortfolio & IPagination>,
  ) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = portfolioPayload;

    const portfolios: Awaited<IPortfolio[] | null> = await Portfolio.find({
      ...restOfPayload,
      isDelete: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return portfolios;
  }

  // Update portfolio details
  static async updatePortfolioDetails(
    portfolioPayload: Partial<IPortfolio>,
    update:
      | Partial<IPortfolio>
      | { $push?: Record<any, any>; $set?: Record<any, any> }
      | { $set: Partial<IPortfolio> },
      arrayFilters?: any[] | undefined
  ) {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {
        ...portfolioPayload,
      },
      { ...update },
      { new: true, runValidators: true, arrayFilters }, // Returns updated portfolio details
    );

    return updatedPortfolio;
  }
}

