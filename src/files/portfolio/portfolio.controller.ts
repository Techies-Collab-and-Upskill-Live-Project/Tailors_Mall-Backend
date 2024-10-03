import { Request, Response, NextFunction } from "express";
import { fileModifier, manageAsyncOps } from "../../utils";
import { CustomError } from "../../utils/error";
import { responseHandler } from "../../core/response";
import { statusCode } from "../../constants/statusCode";
import { PortfolioService } from "./portfolio.services";
import mongoose from "mongoose";  // Import mongoose for ObjectId conversion

class PortfolioController {

  // Create portfolio item (image/video)
  async createPortfolioItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.createPortfolioService(req.body, res.locals.jwt)
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
      PortfolioService.fetchPortfolioService(req.query),
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
    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    
    const [error, data] = await manageAsyncOps(
      PortfolioService.updatePortfolioService(res.locals.jwt, objectId, req.body)
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
    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    
    const [error, data] = await manageAsyncOps(
      PortfolioService.deletePortfolioService(res.locals.jwt, objectId)
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }
}

export default new PortfolioController();

