import mongoose from "mongoose"
import { INotification } from "./notification.interface"

const NotificationSchema = new mongoose.Schema<INotification>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      refPath: "userType",
    },
    // userType: {
    //   type: String,
    //   enum: ["Client", "Designer", "Admin"],
    // },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "read"],
      default: "new",
    },
    recipient: {
      type: String,
      enum: ["Client", "Designer"],
    },
    recipientId: {
      type: mongoose.Types.ObjectId,
      refPath: "recipient",
    },
  },
  { timestamps: true },
)

const notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema,
  "notification"
)

export default notification
