import { NextFunction, Response, Request } from "express";
import { manageAsyncOps } from "../../../utils";
import AuthService from "./general.service";
import { CustomError } from "../../../utils/error";
import { responseHandler } from "../../../core/response";
import { statusCode } from "../../../constants/statusCode";

class GeneralController {
  async searchCollectionController(
    req: Request,
    res: Response, 
    next: NextFunction
  ) {
    const [error, data] = await manageAsyncOps(
      AuthService.searchCollections(req.query)
    )

    if (error) return next( new CustomError(error.message))
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.SUCCESS, data!)
  }
}

export default new GeneralController;