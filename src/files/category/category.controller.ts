import { manageAsyncOps } from "../../utils"
import { NextFunction, Response, Request } from "express"
import { CustomError } from "../../utils/error"
import { responseHandler } from "../../core/response"
import { CategoryService } from "./category.service"
import { statusCode } from "../../constants/statusCode"


class CategoryController {
  async createCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      CategoryService.createCategory(req.body),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.CREATED, data!)
  }

  async getCategoryController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      CategoryService.fetchCategoryService(req.query),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async updateCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      CategoryService.updateCategory(req.body, req.params.id),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }

  async deleteCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const [error, data] = await manageAsyncOps(
      CategoryService.deleteCategory(req.params.id),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, statusCode.SUCCESS, data!)
  }
}

export default new CategoryController()
