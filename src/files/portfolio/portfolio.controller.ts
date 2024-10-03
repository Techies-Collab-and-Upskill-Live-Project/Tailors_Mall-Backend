import { Request, Response, NextFunction } from "express";
import { fileModifier, manageAsyncOps } from "../../utils";
import { CustomError } from "../../utils/error";
import { responseHandler } from "../../core/response";
import { statusCode } from "../../constants/statusCode";
import { PortfolioService } from "./portfolio.services";

class PortfolioController {
  // Create portfolio item (image/video)
  async createPortfolioItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // Use fileModifier for handling image/video uploads
    const [error, data] = await manageAsyncOps(
      PortfolioService.createPortfolioItemService(req.body, res.locals.jwt, req.files)
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }

  // Fetch portfolio items for a designer
  async fetchPortfolioItemsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.fetchPortfolioItemsService(res.locals.jwt, req.query),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }

  // Update portfolio item
  async updatePortfolioItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.updatePortfolioItemService(req.body, req.params.id, res.locals.jwt)
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }

  // Delete portfolio item
  async deletePortfolioItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.deletePortfolioItemService(req.params.id, res.locals.jwt),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }
}

export default new PortfolioController();

