import { IJob } from "./job.interface";
import Job from "./job.model";

export class JobRepository {
  static async createJob(jobPayload: IJob): Promise<IJob> {
    return await Job.create(jobPayload)
  }

  
}