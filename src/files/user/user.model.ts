import mongoose, { Schema, model } from "mongoose"
import { IUser } from "./user.interface"

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["user", "designer"],
      default: "user",
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    businessName: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const user = model<IUser>("User", UserSchema, "user")

export default user
