import mongoose, { Schema, model } from "mongoose"
import { IClient } from "./client.interface"

const ClientSchema = new Schema<IClient>(
  {
    email: {
      type: String,
      // required: true,
    },
    googleId: String,
    facebookId: String,
    phoneNumber: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
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
      // required: true,
    },
    userType: {
      type: String,
      default: "Client"
    },
    location: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
    },
    country: { 
      type: String, 
      // required: true 
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "Designer"
    },
  },
  { timestamps: true },
)

const client = model<IClient>("Client", ClientSchema, "client")

export default client
