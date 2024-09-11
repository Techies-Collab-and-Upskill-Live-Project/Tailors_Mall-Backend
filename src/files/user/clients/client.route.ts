import express from "express"
import validate from "../../../validations/validate"
import { checkSchema } from "express-validator"
import { createClientValidation } from "../../../validations"
import ClientController from "./client.controller"
import loginAdminValidation from "../../../validations/auth/login_admin.validation"
import authController from "../../auth/auth.controller"
import { isAuthenticated } from "../../../utils"
import uploadManager from "../../../utils/multer"
import passport from "passport"
import client from "./client.model"
import passportConfig from "../../../utils/passportConfig"

const ClientRoute = express.Router()

passportConfig(client);

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

// Configure passport with the Client model

ClientRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
ClientRoute.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log')
  }
);

ClientRoute.get('/facebook', passport.authenticate('facebook'));
ClientRoute.get('/facebook/callback', passport.authenticate('facebook', {
  // successRedirect: '/log',
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log')
  }
);

ClientRoute.post(
  "/signup",
  validate(checkSchema(createClientValidation)),
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