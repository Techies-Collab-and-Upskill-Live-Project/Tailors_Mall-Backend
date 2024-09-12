import { NextFunction, Response, Request } from 'express'
import { fileModifier, manageAsyncOps } from "../../../utils";
import DesignerService from "./designer.service";
import { CustomError } from "../../../utils/error";
import { responseHandler } from "../../../core/response";
import { statusCode } from "../../../constants/statusCode";
import { IPagination, IResponse } from '../../../constants';

class DesignerController {
  async designerSignupController(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      DesignerService.createDesigner(req.body)
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async designerLoginController(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      DesignerService.DesignerLogin(req.body)
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async designerResetPassword(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      DesignerService.resetPassword(req.body)
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .SUCCESS, data!)
  }

  async designerUpdatePassword(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      DesignerService.updatePassword(req.body, res.locals.jwt)
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async fetchDesignerController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.fetchDesignersService(req.query),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async searchController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.searchService(req.query),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async updateDesignerProfile(req: Request, res: Response, next: NextFunction) {
    let { image, body } = fileModifier(req)
    req.body.image = image

    const [error, data] = await manageAsyncOps(
      DesignerService.updateDesignerProfile(res.locals.jwt, req.body),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, 200, data!)
  }

  async deleteDesignerProfile(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.deleteDesignerProfile(res.locals.jwt),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, 200, data!)
  }

  async getDesignerProfile(_: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.getDesignerDetails(res.locals.jwt),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, statusCode  .SUCCESS, data!)
  }
}

/**
   * Add portfolio item
   */

  async addPortfolioItem(req: Request, res: Response, next: NextFunction) {
    const { image, body } = fileModifier(req); // Assuming image upload handled here
    req.body.mediaURL = image; // Assuming image URL is returned

    const [error, data] = await manageAsyncOps(
      DesignerService.addPortfolioItem(res.locals.jwt, req.body),
    );

    if (error) return next(new CustomError(error.message));
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));
    return responseHandler(res, statusCode.CREATED, data!);
  }


   /**
   * Edit portfolio item
   */
  async editPortfolioItem(req: Request, res: Response, next: NextFunction) {
    const { image, body } = fileModifier(req);
    req.body.mediaURL = image; // Assuming image URL is returned

    const [error, data] = await manageAsyncOps(
      DesignerService.editPortfolioItem(res.locals.jwt, req.params.itemId, req.body),
    );

    if (error) return next(new CustomError(error.message));
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));
    return responseHandler(res, statusCode.SUCCESS, data!);
  }

   /**
   * Delete portfolio item
   */
  async deletePortfolioItem(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.deletePortfolioItem(res.locals.jwt, req.params.itemId),
    );

    if (error) return next(new CustomError(error.message));
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));
    return responseHandler(res, statusCode.SUCCESS, data!);
  }
 

   /**
   * Get all portfolio items
   */
  async getPortfolio(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.getPortfolio(res.locals.jwt),
    );

    if (error) return next(new CustomError(error.message));
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));
    return responseHandler(res, statusCode.SUCCESS, data!);
  }

export default new DesignerController()
