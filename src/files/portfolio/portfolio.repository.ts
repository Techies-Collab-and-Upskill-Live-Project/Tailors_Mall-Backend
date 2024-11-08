import pagination, { IPagination } from "../../constants";
import { IPortfolio } from "./portfolio.interface";
import Portfolio from "./portfolio.model";

const { LIMIT, SKIP, SORT } = pagination;

export default class PortfolioRepository {
  static async createPortfolio(portfolioPayload: IPortfolio): Promise<IPortfolio> {
    return Portfolio.create(portfolioPayload);
  }

  static async fetchPortfolio(
    portfolioPayload: Partial<IPortfolio> | Record<any, any>,
    select: Partial<Record<keyof IPortfolio, number | Boolean | object>>,
  ): Promise<Partial<IPortfolio> | null> {
    const portfolio: Awaited<IPortfolio | null> = await Portfolio.findOne(
      {
        ...portfolioPayload,
        isDelete: false,
      },
      select,
    );

    return portfolio;
  }

  static async fetchPortfolioByParams(
    portfolioPayload: Partial<IPortfolio & IPagination>,
  ) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = portfolioPayload;

    const portfolio: Awaited<IPortfolio[] | null> = await Portfolio.find({
      ...restOfPayload,
      isDelete: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return portfolio;
  }

  static async updatePortfolioDetails(
    portfolioPayload: Partial<IPortfolio>,
    update:
      | Partial<IPortfolio>
      | { $push?: Record<string, any>; $set?: Record<string, any> }
      | { $set: Partial<IPortfolio> },
    arrayFilters?: any[] | undefined
  ) {
    const updatePortfolio = await Portfolio.findOneAndUpdate(
      {
        ...portfolioPayload,
      },
      update,
      { new: true, runValidators: true, arrayFilters }, // Returns updated document
    );

    return updatePortfolio;
  }
}

