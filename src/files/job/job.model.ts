import mongoose, { model, Schema } from "mongoose";
import { IJob } from "./job.interface";

const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
    },
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "Client"
    },
    category: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ["full-time", "one-off"],
      default: "one-off"
    },
    description: {
      type: String,
    },
    requiredSkills: {
      type: [String],
    },
    qualification: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "intermediate",
    },
    files: {
      type: [String],
    },
    budget: {
      fixedPrice: {
        type: String,
      },
      priceRange: {
        min: {
          type: String
        },
        max: {
          type: String
        }
      }
    },
    timeLine: {
      type: String
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  }
)

const job = model<IJob>("Job", JobSchema, "job");
export default job;