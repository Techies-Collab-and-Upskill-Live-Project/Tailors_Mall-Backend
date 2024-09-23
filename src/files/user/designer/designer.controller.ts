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
    return responseHandler(res, statusCode.CREATED, data!)
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
    return responseHandler(res, statusCode.SUCCESS, data!)
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
    return responseHandler(res, statusCode.SUCCESS, data!)
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
    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async fetchDesignerController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.fetchDesignersService(req.query),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async searchController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.searchService(req.query),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async updateDesignerProfile(req: Request, res: Response, next: NextFunction) {
    let { image, body } = fileModifier(req)
    req.body.image = image

    const [error, data] = await manageAsyncOps(
      DesignerService.updateDesignerProfile(res.locals.jwt, req.body),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async deleteDesignerProfile(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.deleteDesignerProfile(res.locals.jwt),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async getDesignerProfile(_: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      DesignerService.getDesignerDetails(res.locals.jwt),
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }
}

export default new DesignerController()