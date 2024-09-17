import express from "express";
import validate from "../../../validations/validate";
import { checkSchema } from "express-validator";
import { createDesignersValidation } from "../../../validations";
import DesignerController from "./designer.controller";
import loginAdminValidation from "../../../validations/auth/login_admin.validation";
import authController from "../../auth/auth.controller";
import { isAuthenticated } from "../../../utils";
import uploadManager from "../../../utils/multer";
import passport from "passport";
import designer from "./designer.model";
import passportConfig from "../../../utils/passportConfig";

const DesignerRoute = express.Router();

passportConfig(designer);

const {
  designerSignupController,
  designerLoginController,
  designerResetPassword,
  designerUpdatePassword,
  getDesignerProfile,
  updateDesignerProfile,
  deleteDesignerProfile,
  fetchDesignerController,
  searchController,
  addPortfolioItem,
  editPortfolioItem,
  deletePortfolioItem,
  getPortfolio
} = DesignerController;

const {
  sendOTP,
  verifyOTP,
} = authController;

// Configure passport with the Designer model

DesignerRoute.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

DesignerRoute.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log');
  }
);

DesignerRoute.get('/facebook', passport.authenticate('facebook'));

DesignerRoute.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log');
  }
);

DesignerRoute.post(
  "/signup",
  validate(checkSchema(createDesignersValidation)),
  designerSignupController,
);

DesignerRoute.post(
  "/login",
  validate(checkSchema(loginAdminValidation)),
  designerLoginController
);

DesignerRoute.post("/send-otp", sendOTP);
DesignerRoute.post("/verify/otp", verifyOTP);
DesignerRoute.post("/reset/password", designerResetPassword);

DesignerRoute.get("/", fetchDesignerController);
DesignerRoute.get("/search", searchController);

DesignerRoute.use(isAuthenticated);

DesignerRoute.get("/me", getDesignerProfile);
DesignerRoute.put(
  "/update",
  uploadManager("ProfileImage").single("image"),
  updateDesignerProfile,
);
DesignerRoute.delete("/delete", deleteDesignerProfile);
DesignerRoute.post("/update/password", designerUpdatePassword);

// Portfolio Routes
DesignerRoute.get("/portfolio", getPortfolio);
DesignerRoute.get("/portfolio/:itemId", getPortfolio);
DesignerRoute.post("/portfolio", uploadManager("PortfolioImage").single("media"), addPortfolioItem);
DesignerRoute.put("/portfolio/:itemId", uploadManager("PortfolioImage").single("media"), editPortfolioItem);
DesignerRoute.delete("/portfolio/:itemId", deletePortfolioItem);

export default DesignerRoute;

