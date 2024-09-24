import { NextFunction, Response, Request } from "express"
import { manageAsyncOps } from "../../utils"
import { CustomError } from "../../utils/error"
import { responseHandler } from "../../core/response"
import { statusCode } from "../../constants/statusCode"
import { JobService } from "./job.service"

class JobController {
  async createJobController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      JobService.createJobService(req.body, res.locals.jwt),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.CREATED, data!)
  }

  async getJobController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      JobService.fetchJobService(req.query),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async updateJobController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      JobService.updateJob(req.body, req.params.id),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async deleteJobController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      JobService.deleteJob(req.params.id),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }
}

export default new JobController()