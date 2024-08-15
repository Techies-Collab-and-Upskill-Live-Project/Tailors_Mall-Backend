import { NextFunction, Response, Request } from 'express'
import { fileModifier, manageAsyncOps } from "../../../utils";
import ClientService from "./client.service";
import { CustomError } from "../../../utils/error";
import { responseHandler } from "../../../core/response";
import { statusCode } from "../../../constants/statusCode";
import { IPagination, IResponse } from '../../../constants';
import { IClient } from './client.interface';

class ClientController {
  async clientSignupController(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      ClientService.createClient(req.body)
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async clientLoginController(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      ClientService.clientLogin(req.body)
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async clientResetPassword(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      ClientService.resetPassword(req.body)
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async clientUpdatePassword(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      ClientService.updatePassword(req.body, res.locals.jwt)
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode  .CREATED, data!)
  }

  async fetchClientController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ClientService.fetchClientsService(req.query),
    )
    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async searchController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ClientService.searchService(req.query),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async updateClientProfile(req: Request, res: Response, next: NextFunction) {
    let { image, body } = fileModifier(req)
    req.body.image = image

    const [error, data] = await manageAsyncOps(
      ClientService.updateClientProfile(res.locals.jwt, req.body),
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async deleteClientProfile(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ClientService.deleteClientProfile(res.locals.jwt),
    )
    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async getClientProfile(_: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ClientService.getClientDetails(res.locals.jwt),
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }
}

export default new ClientController()