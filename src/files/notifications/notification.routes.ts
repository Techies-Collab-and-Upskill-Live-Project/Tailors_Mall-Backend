import express from "express"
import { isAuthenticated, adminVerifier } from "../../utils"
import notificationController from "./notification.controller"

const NotificationRouter = express.Router()

const { fetchNotifications, updateNotificationControler } = notificationController

//authentications
NotificationRouter.use(isAuthenticated)

//routes
NotificationRouter.get("/", fetchNotifications)
NotificationRouter.put("/:notificationId", updateNotificationControler)


export default NotificationRouter
