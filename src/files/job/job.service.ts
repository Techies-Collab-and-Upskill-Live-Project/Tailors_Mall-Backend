import mongoose from "mongoose";
import { IPagination, IResponse } from "../../constants";
import { IToken, queryConstructor } from "../../utils";
import { IUser } from "../user/general/general.interface";
import { IJob, IJobApplication } from "./job.interface";
import { jobMessages } from "./job.messages";
import { JobRepository } from "./job.repository";
import NotificationRepository from "../notifications/notification.repository";
import { jobApplication as JobApplication } from "./job.model";
import DesignerService from "../user/designer/designer.service";
import ClientService from "../user/clients/client.service";

export class JobService {
  static async createJobService (
    jobPayload: IJob,
    clientPayload: Partial<IUser & IPagination>,
  ): Promise<IResponse> {
    const client = await ClientService.getClientDetails(clientPayload)

    if (!client?.success)
      return { success: false, msg: jobMessages.UNAUTHORIZED };

    const job = await JobRepository.createJob({
      ...jobPayload, clientId: clientPayload._id 
    })

    if (!job)
      return { success: false, msg: jobMessages.REQUEST_FAILURE };

    const notifications = [
      NotificationRepository.createNotification({
        title: "New Job Posted",
        message: `A new job titled ${jobPayload.title} has been posted by ${clientPayload.fullName}.`,
        recipient: "Designer", // Sending notification to all designers
      }),
      NotificationRepository.createNotification({
        title: "Job Post Created",
        message: `Your job titled ${jobPayload.title} has been posted successfully.`,
        recipientId: new mongoose.Types.ObjectId(clientPayload._id),
        recipient: "Client", // Notification to the client
      }),
    ];
  
    // Use Promise.all to execute both notifications concurrently
    await Promise.all(notifications);

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

  static async applyForJobService(data: {
    designerId: IToken,
    params: {jobId: String},
    applicationPayload: Partial<IJobApplication>,
  }): Promise<IResponse> {
    const { designerId, params, applicationPayload } = data
    // Find the designer and job
    const designer = await DesignerService.getDesignerDetails(designerId);
    if (!designer?.success) {
      return { success: false, msg: "You are not authorized to apply for jobs" };
    }

    const job = await JobRepository.fetchJob({ _id: params.jobId }, {});
    if (!job) {
      return { success: false, msg: "job not found." };
    }
  
    // Create job application
    const jobApplication = await JobApplication.create({
      ...applicationPayload,
      jobId: params.jobId,
      designerId
    });
  
    const jobUpdatePayload = {
      applications: [...(job.applications || []), jobApplication._id], // Add application ID to job applications
    }

    // Update designer and job with the new application reference
    const designerUpdateResponse = await DesignerService.updateDesignerProfile(designerId, jobUpdatePayload)
    if (!designerUpdateResponse.success) {
      return { success: false, msg: designerUpdateResponse.msg };
    }
  
    const jobUpdateResponse = await this.updateJob(jobUpdatePayload, params.jobId);
    if (!jobUpdateResponse.success) {
      return { success: false, msg: jobUpdateResponse.msg };
    }

    await NotificationRepository.createNotification({
      title: "job-application",
      message: `Designer "${designer?.data?.fullName}" has applied for your job "${job.title}".`,
      recipientId: new mongoose.Types.ObjectId(job.clientId),
      recipient: "Client",
    })
  
    return {
      success: true,
      msg: "Application submitted successfully.",
      data: jobApplication,
    };
  }
}