import express from "express"
import jobController from "./job.controller";
import { isAuthenticated } from "../../utils";
import validate from "../../validations/validate";
import { createJobValidation } from "../../validations/job/createJob.validatios";
import { checkSchema } from "express-validator";

const JobRouter = express.Router();

const {
  createJobController,
  getJobController,
  updateJobController,
  deleteJobController,
  applyForJobController,
  getDesignerApplicationsController,
} = jobController

JobRouter.use(isAuthenticated)

//routes
JobRouter.post(
  "/",
  validate(checkSchema(createJobValidation)),
  createJobController,
)
JobRouter.get("/", getJobController)
JobRouter.put("/:id", updateJobController)
JobRouter.put("/delete/:id", deleteJobController)
JobRouter.put("/apply/:jobId", applyForJobController)
JobRouter.get("/applied-jobs", getDesignerApplicationsController)

export default JobRouter
