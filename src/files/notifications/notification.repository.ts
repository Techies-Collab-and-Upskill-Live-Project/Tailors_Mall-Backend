import Notification from "./notification.model"
import pagination, { IPagination } from "../../constants"
import { INotification } from "./notification.interface"
import { UpdateQuery } from "mongoose"

const { LIMIT, SKIP, SORT } = pagination

export default class NotificationRepository {
  static createNotification(
    notificationPayload: Partial<INotification>
  ): Promise<INotification> {
    return Notification.create(notificationPayload)
  }

  static async findSingleNotificationByParams(
    notificationPayload: Partial<INotification>
  ): Promise<INotification | null> {
    const notification: Awaited<INotification | null> =
      await Notification.findOne({
        ...notificationPayload,
      })
    return notification
  }

  static async fetchNotificationsByParams(
    notificationPayload: Partial<INotification & IPagination>
  ): Promise<INotification[] | []> {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = notificationPayload
    const notifications: Awaited<INotification[] | null> =
      await Notification.find({
        ...restOfPayload,
      })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("userId", { firstName: 1, lastName: 1 })

    return notifications
  }

  static async updateNotification(
    payload: Partial<INotification>,
    update: UpdateQuery<Partial<INotification>>,
  ) {
    const updateNotification = await Notification.findOneAndUpdate(
      {
        ...payload,
      },
      { ...update },
      { new: true, runValidators: true },
    )

    return updateNotification
  }
}
