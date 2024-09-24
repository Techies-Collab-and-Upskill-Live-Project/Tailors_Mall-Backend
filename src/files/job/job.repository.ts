import pagination, { IPagination } from "../../constants";
import { IJob } from "./job.interface";
import Job from "./job.model";
const { LIMIT, SKIP, SORT } = pagination

export class JobRepository {
  static async createJob(jobPayload: IJob): Promise<IJob> {
    return await Job.create(jobPayload)
  }

  static async fetchJob(
    jobPayload: Partial<IJob> | Record<any, any>,
    select: Partial<Record<keyof IJob, number | Boolean | object>>,
  ): Promise<Partial<IJob> | null> {
    const job: Awaited<IJob | null> = await Job.findOne(
      {
        ...jobPayload,
      },
      select,
    )

    return job
  }

  static async fetchJobByParams(
    jobPayload: Partial<IJob & IPagination>,
  ) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = jobPayload

    const job: Awaited<IJob[] | null> = await Job.find({
      ...restOfPayload,
      isDelete: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return job
  }

  static async updateJobDetails(
    jobPayload: Partial<IJob>,
    update:
      | Partial<IJob>
      | { $push?: Record<any, any>; $set?: Record<any, any> }
      | { $set: Partial<IJob> },
      arrayFilters?: any[] | undefined
  ) {
    const updateJob = await Job.findOneAndUpdate(
      {
        ...jobPayload,
      },
      { ...update },
      { new: true, runValidators: true, arrayFilters }, //returns details about the update
    )

    return updateJob
  }
}