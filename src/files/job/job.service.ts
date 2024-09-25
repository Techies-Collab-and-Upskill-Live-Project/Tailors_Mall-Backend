import mongoose from "mongoose";
import { IPagination, IResponse } from "../../constants";
import { queryConstructor } from "../../utils";
import Client from "../user/clients/client.model";
import { IUser } from "../user/general/general.interface";
import AuthService from "../user/general/general.service";
import { IJob } from "./job.interface";
import { jobMessages } from "./job.messages";
import { JobRepository } from "./job.repository";
import NotificationRepository from "../notifications/notification.repository";

export class JobService {
  static async createJobService (
    jobPayload: IJob,
    clientPayload: Partial<IUser & IPagination>,
  ): Promise<IResponse> {
    const client = await AuthService.getUserDetails(Client, clientPayload)

    if (!client)
      return { success: false, msg: jobMessages.UNAUTHORIZED };

    const job = await JobRepository.createJob({
      ...jobPayload, clientId: clientPayload._id 
    })

    if (!job)
      return { success: false, msg: jobMessages.REQUEST_FAILURE };

    await NotificationRepository.createNotification({
      title: "New Job Posted",
      message: `Congratulations, you are now a verified partner with Lead Capital... Welcome on board`,
      recipientId: new mongoose.Types.ObjectId(clientPayload._id),
      recipient: "Client",
    })

    return {
      success: true,
      msg: jobMessages.REQUEST_SUCCESS,
      data: job,
    }
  }

  static async fetchJobService(jobPayload: Partial<IJob>) {
    const { error, params, limit, skip, sort } = queryConstructor(
      jobPayload,
      "createdAt",
      "Request",
    )

    if (error) return { success: false, msg: error }

    const jobs = await JobRepository.fetchJobByParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (jobs.length < 1)
      return { success: false, msg: jobMessages.FETCH_ERROR, data: [] }

    return {
      success: true,
      msg: jobMessages.FETCH_SUCCESS,
      data: jobs,
    }
  }

  static async updateJob(
    jobPayload: Partial<IJob>,
    jobId: any,
  ) {
    const job = await JobRepository.updateJobDetails(
      { _id: new mongoose.Types.ObjectId(jobId) },
      { $set: { ...jobPayload } },
    )

    if (!job) return { success: false, msg: jobMessages.UPDATE_ERROR }

    return {
      success: true,
      msg: jobMessages.UPDATE_SUCCESS,
      job,
    }
  }

  static async deleteJob(jobPayload: any) {
    const job = await JobRepository.updateJobDetails(
      { _id: new mongoose.Types.ObjectId(jobPayload) },
      { isDelete: true },
    )
    if (!job) return { success: false, msg: jobMessages.DELETE_ERROR }

    return {
      success: true,
      msg: jobMessages.DELETE,
    }
  }
}