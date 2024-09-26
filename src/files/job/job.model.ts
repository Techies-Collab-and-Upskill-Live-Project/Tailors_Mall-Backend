import mongoose, { model, Schema } from "mongoose";
import { IJob, IJobApplication } from "./job.interface";

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
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
    }],
    status: {
      type: String,
      enum: ["open", "closed", "in-progress", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
)

// Indexes for faster search by clientId or status (optional)
JobSchema.index({ clientId: 1 });
JobSchema.index({ status: 1 });

const job = model<IJob>("Job", JobSchema, "job");

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "reviewed", "accepted", "rejected"],
      default: "applied",
    },
    message: {
      type: String,
      default: "", // optional message from the designer
    },
  },
  { timestamps: true }
);

const jobApplication = model<IJobApplication>(
  "JobApplication",
  JobApplicationSchema,
  "jobApplication"
);

export { job, jobApplication }