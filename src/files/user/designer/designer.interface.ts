import { ObjectId } from "mongoose";

export interface IDesigner {
  id: ObjectId
  userId: ObjectId
  experience: "beginner" | "expert" | "pro"
}