import { NextFunction, Request, Response } from "express"
import { fileModifier, fileModifierIncludesVideo, manageAsyncOps } from "../../utils"
import { PortfolioService } from "./portfolio.service"
import { CustomError } from "../../utils/error"
import { responseHandler } from "../../core/response"
import { statusCode } from "../../constants/statusCode"

class PortfolioController {
  async createPortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let { images, videos, coverImage, body } = fileModifierIncludesVideo(req)
    req.body.images = images
    req.body.videos = videos
    req.body.coverImage = coverImage

    const [error, data] = await manageAsyncOps(
      PortfolioService.createPortfolio(req.body, res.locals.jwt),
    )

    if(error) {
      console.log("Error rrr", error)
    }

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.CREATED, data!)
  }

  async getPortfolioController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.fetchPortfolioService(req.query, res.locals.jwt),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async updatePortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let { images, videos, coverImage, body } = fileModifierIncludesVideo(req)
    req.body.images = images
    req.body.videos = videos
    req.body.coverImage = coverImage

    const [error, data] = await manageAsyncOps(
      PortfolioService.updatePortfolio(req.body, req.params.id, res.locals.jwt),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async deletePortfolioController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.deletePortfolio(req.params.id),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async toggleLikePortfolio(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      PortfolioService.toggleLikePortfolio(req.params, res.locals.jwt),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }
}

export default new PortfolioController();