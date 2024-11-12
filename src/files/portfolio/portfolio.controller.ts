import { NextFunction, Request, Response } from "express";
import { fileModifierIncludesVideo, manageAsyncOps } from "../../utils";
import { PortfolioService } from "./portfolio.service";
import { CustomError } from "../../utils/error";
import { responseHandler } from "../../core/response";
import { statusCode } from "../../constants/statusCode";

class PortfolioController {
  async createPortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let { images, videos, coverImage } = fileModifierIncludesVideo(req);

    // Collect images and videos as content items with explicit typing for `url`
    const content = [
      ...images.map((url: string) => ({ type: "image", data: url })),
      ...videos.map((url: string) => ({ type: "video", data: url })),
    ];
    req.body.content = content;
    req.body.coverImage = coverImage;

    const [error, data] = await manageAsyncOps(
      PortfolioService.createPortfolio(req.body, res.locals.jwt),
    );

    if (error) {
      console.log("Error:", error);
      return next(error);
    }
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }

  async getPortfolioController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.fetchPortfolioService(req.query, res.locals.jwt),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }

  async updatePortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let { images, videos, coverImage } = fileModifierIncludesVideo(req);

    // Update the content field with any new images or videos with explicit typing for `url`
    const content = [
      ...images.map((url: string) => ({ type: "image", data: url })),
      ...videos.map((url: string) => ({ type: "video", data: url })),
    ];
    req.body.content = content;
    req.body.coverImage = coverImage;

    const [error, data] = await manageAsyncOps(
      PortfolioService.updatePortfolio(req.body, req.params.id, res.locals.jwt),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }

  async deletePortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.deletePortfolio(req.params.id),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }

  async toggleLikePortfolio(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.toggleLikePortfolio(req.params, res.locals.jwt),
    );

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.SUCCESS, data!);
  }
}

export default new PortfolioController();

