import mongoose from "mongoose"

export interface IJob {
  _id: any
  clientId: any
  title: string
  category: string
  jobType: 'full-time' | 'one-off'
  description: string
  requiredSkills: string[]
  qualification: "beginner" | "intermediate" | "expert"
  files: string[]
  budget: IBudget
  timeLine: string
  isDelete: boolean
  status?: "open" | "closed" | "in-progress" | "completed"
  applications?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBudget {
  fixedPrice: string
  priceRange: {
    min: number
    max: number
  }
}

export interface IJobApplication {
  designerId: mongoose.Types.ObjectId;  // Reference to the designer who applied
  jobId: mongoose.Types.ObjectId;       // Reference to the job applied for
  status: "applied" | "reviewed" | "accepted" | "rejected";  // Application status
  message?: string;  // Optional message from the designer (cover letter or additional details)
  createdAt?: Date;  // Timestamp when the application was created
  updatedAt?: Date;  // Timestamp when the application was last updated
}