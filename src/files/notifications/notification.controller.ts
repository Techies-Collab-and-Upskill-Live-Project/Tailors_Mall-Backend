import { NextFunction, Response, Request } from "express"
import { responseHandler } from "../../core/response"
import { manageAsyncOps } from "../../utils"
import { CustomError } from "../../utils/error"
import NotificationService from "./notification.service"

class NotificationController {
  async fetchNotifications(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      NotificationService.fetchUserNotifications(req.query, res.locals.jwt)
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, 200, data!)
  }

  async updateNotificationControler(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      NotificationService.updateNotification({
        params: req.params as { notificationId: string },
        notificationPayload: req.body
      })
    )

    if (error) return next(error)

    if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

    return responseHandler(res, 200, data!)
  }
}

export default new NotificationController()
