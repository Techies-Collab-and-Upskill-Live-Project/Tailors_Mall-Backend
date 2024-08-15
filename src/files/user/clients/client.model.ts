import mongoose, { Schema, model } from "mongoose"
import { IClient } from "./client.interface"

const ClientSchema = new Schema<IClient>(
  {
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
    info: {
      type: String,
    },
    service: {
      type: String,
      enum: ["fulltime", "oneoff"],
      default: "fulltime"
    },
    experienceRequirement: {
      type: String,
      enum: ["begginer", "intermediate", "expert"],
      default: "begginer"
    },
    workChoice: {
      type: String,
      enum: ["local", "remote", "neutral"],
      default: "neutral"
    },
    fullName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
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

const client = model<IClient>("Client", ClientSchema, "client")

export default client
