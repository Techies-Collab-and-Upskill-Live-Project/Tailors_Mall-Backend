import { NextFunction, Response, Request } from 'express'
import { responseHandler } from '../../core/response'
import { fileModifier, manageAsyncOps } from '../../utils'
import { CustomError } from '../../utils/error'
import UserService from './user.service'
import { statusCode } from '../../constants/statusCode'

class UserController {
  async signupController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(UserService.signup(req.body))

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(UserService.userLogin(req.body))

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 401, data!))

    return responseHandler(res, 200, data!)
  }

  async fetchUsersController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      UserService.fetchUsersService(req.query),
    )
    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async searchController(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      UserService.searchService(req.query),
    )

    if (error) return next(error)
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))
    return responseHandler(res, statusCode.CREATED, data!)
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(UserService.resetPassword(req.body))

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async passwordupdate(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(UserService.updatePassword(req.body, res.locals.jwt))

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    let { image, body } = fileModifier(req)
    req.body.image = image

    const [error, data] = await manageAsyncOps(
      UserService.updateUserProfile(res.locals.jwt, req.body),
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      UserService.deleteUserProfile(res.locals.jwt),
    )
    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }

  async getUserDetails(_: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      UserService.getUserDetails(res.locals.jwt),
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400))

    return responseHandler(res, 200, data!)
  }
}

export default new UserController()
