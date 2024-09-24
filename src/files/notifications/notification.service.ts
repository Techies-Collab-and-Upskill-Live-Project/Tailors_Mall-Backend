import mongoose from "mongoose"
import { IResponse } from "../../constants"
import { IToken, queryConstructor } from "../../utils"
import NotificationRepository from "./notification.repository"
import { INotification } from "./notification.interface"
import { notificationMessages } from "./notification.messages"

export default class NotificationService {
  static async create(payload: Partial<INotification>) {
    return NotificationRepository.createNotification(payload)
  }

  static async fetchUserNotifications(
    query: Partial<INotification>,
    user: IToken,
  ): Promise<IResponse> {
    const { _id, isAdmin } = user
    const { error, params, limit, skip, sort } = queryConstructor(
      query,
      "createdAt",
      "Notifications",
    )

    if (error) return { success: false, msg: error }

    let extraParams = {} as INotification

    // if (isAdmin) {
    //   extraParams.recipient = "Admin"
    // } else {
      extraParams.userId = new mongoose.Types.ObjectId(_id)
    // }

    const notifications =
      await NotificationRepository.fetchNotificationsByParams({
        ...params,
        limit,
        skip,
        sort,
        ...extraParams,
      })

    if (notifications.length < 1)
      return {
        success: false,
        msg: notificationMessages.NOTIFICATION_NOT_FOUND,
        data: [],
      }

    return {
      success: true,
      msg: notificationMessages.NOTIFICATION_FETCHED,
      data: notifications,
    }
  }

  static async updateNotification(data: {
    params: { notificationId: string }
    notificationPayload: Partial<INotification>
  }) {
    const { params, notificationPayload } = data

    const notification = await NotificationRepository.updateNotification(
      { _id: new mongoose.Types.ObjectId(params.notificationId) },
      {
        $set: {
          ...notificationPayload,
        },
      },
    )

    if (!notification)
      return { success: false, msg: notificationMessages.UPDATE_FAIL }

    return {
      success: true,
      msg: notificationMessages.UPDATE_SUCCESSFUL,
      data: notification,
    }
  }
}
