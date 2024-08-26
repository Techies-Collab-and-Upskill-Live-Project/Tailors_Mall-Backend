import express from "express"
import validate from "../../../validations/validate"
import { checkSchema } from "express-validator"
import { createUserValidation } from "../../../validations"
import DesignerController from "./designer.controller"
import loginAdminValidation from "../../../validations/auth/login_admin.validation"
import authController from "../../auth/auth.controller"
import { isAuthenticated } from "../../../utils"
import uploadManager from "../../../utils/multer"

const DesignerRoute = express.Router()

const {
  designerSignupController,
  designerLoginController,
  designerResetPassword,
  designerUpdatePassword,
  getDesignerProfile,
  updateDesignerProfile,
  deleteDesignerProfile,
  fetchDesignerController,
  searchController
} = DesignerController

const {
  sendOTP,
  verifyOTP,
} = authController

DesignerRoute.post(
  "/signup",
  validate(checkSchema(createUserValidation)),
  designerSignupController,
)

DesignerRoute.post(
  "/login",
  validate(checkSchema(loginAdminValidation)),
  designerLoginController
)

DesignerRoute.post("/send-otp", sendOTP)
DesignerRoute.post("/verify/otp", verifyOTP)
DesignerRoute.post("/reset/password", designerResetPassword)

DesignerRoute.get("/", fetchDesignerController)
DesignerRoute.get("/search", searchController)

DesignerRoute.use(isAuthenticated)

DesignerRoute.get("/me", getDesignerProfile)
DesignerRoute.put(
  "/update",
  uploadManager("ProfileImage").single("image"),
  updateDesignerProfile,
)
DesignerRoute.delete("/delete", deleteDesignerProfile)
DesignerRoute.post("/update/password", designerUpdatePassword)

export default DesignerRoute