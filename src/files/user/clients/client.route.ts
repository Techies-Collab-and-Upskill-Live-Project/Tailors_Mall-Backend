import express from "express"
import validate from "../../../validations/validate"
import { checkSchema } from "express-validator"
import { createUserValidation } from "../../../validations"
import ClientController from "./client.controller"
import loginAdminValidation from "../../../validations/auth/login_admin.validation"
import authController from "../../auth/auth.controller"
import { isAuthenticated } from "../../../utils"
import uploadManager from "../../../utils/multer"

const ClientRoute = express.Router()

const {
  clientSignupController,
  clientLoginController,
  clientResetPassword,
  clientUpdatePassword,
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  fetchClientController,
  searchController
} = ClientController

const {
  sendOTP,
  verifyOTP,
} = authController

ClientRoute.post(
  "/signup",
  validate(checkSchema(createUserValidation)),
  clientSignupController,
)

ClientRoute.post(
  "/login",
  validate(checkSchema(loginAdminValidation)),
  clientLoginController
)

ClientRoute.post("/send-otp", sendOTP)
ClientRoute.post("/verify/otp", verifyOTP)
ClientRoute.post("/reset/password", clientResetPassword)

ClientRoute.get("/", fetchClientController)
ClientRoute.get("/search", searchController)

ClientRoute.use(isAuthenticated)

ClientRoute.get("/me", getClientProfile)
ClientRoute.put(
  "/update",
  uploadManager("ProfileImage").single("image"),
  updateClientProfile,
)
ClientRoute.delete("/delete", deleteClientProfile)
ClientRoute.post("/update/password", clientUpdatePassword)

export default ClientRoute