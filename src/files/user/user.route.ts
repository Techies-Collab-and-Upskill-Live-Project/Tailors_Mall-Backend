import express from "express"
import { isAuthenticated } from "../../utils"
import userController from "./user.controller"
import upload from "../../utils/multer"
const { checkSchema } = require("express-validator")
import validate from "../../validations/validate"
import {
  createUserValidation,
  // completeRegistrationValidation,
} from "../../validations"
import loginAdminValidation from "../../validations/auth/login_admin.validation"
import authController from "../auth/auth.controller"
import uploadManager from "../../utils/multer"

const UserRoute = express.Router()

const { 
  signupController, 
  fetchUsersController, 
  searchController, 
  loginUser, 
  passwordupdate,
  updateProfile,
  deleteUser,
  getUserDetails,
} = userController

const {
  sendOTP,
  verifyOTP,
  resetPassword
} = authController

//routes
UserRoute.post(
  "/signup",
  validate(checkSchema(createUserValidation)),
  signupController,
)

UserRoute.post(
  "/login",
  validate(checkSchema(loginAdminValidation)),
  loginUser
)

UserRoute.post("/send-otp", sendOTP)
UserRoute.post("/verify/otp", verifyOTP)
UserRoute.post("/reset/password", resetPassword)

UserRoute.get("/", fetchUsersController)
UserRoute.get("/search", searchController)

UserRoute.use(isAuthenticated)

UserRoute.get("/me", getUserDetails)
UserRoute.put(
  "/update",
  uploadManager("ProfileImage").single("image"),
  updateProfile,
)

UserRoute.delete("/delete", deleteUser)

UserRoute.post("/update/password", passwordupdate)

export default UserRoute
