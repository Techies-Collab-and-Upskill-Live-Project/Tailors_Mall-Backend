import express from "express"
import validate from "../../../validations/validate"
import { checkSchema } from "express-validator"
import { createDesignersValidation } from "../../../validations"
import DesignerController from "./designer.controller"
import loginAdminValidation from "../../../validations/auth/login_admin.validation"
import authController from "../../auth/auth.controller"
import { isAuthenticated } from "../../../utils"
import uploadManager from "../../../utils/multer"
import passport from "passport"
import designer from "./designer.model"
import passportConfig from "../../../utils/passportConfig"


const DesignerRoute = express.Router()

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
  searchController
} = DesignerController

const {
  sendOTP,
  verifyOTP,
} = authController

// Configure passport with the Designer model

DesignerRoute.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));
DesignerRoute.get('/google/callback', passport.authenticate('google', {
  // successRedirect: '/log',
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log')
  }
);

DesignerRoute.get('/facebook', passport.authenticate('facebook'));
DesignerRoute.get('/facebook/callback', passport.authenticate('facebook', {
  // successRedirect: '/log',
  failureRedirect: '/',
}),
  (req, res) => {
    res.redirect('/log')
  }
);

DesignerRoute.post(
  "/signup",
  validate(checkSchema(createDesignersValidation)),
  designerSignupController,
)

/**
 * @swagger
 * /designer/login:
 *   post:
 *     summary: Designer login
 *     description: Authenticates a designer and returns a JWT token.
 *     tags:
 *       - Designer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: designer@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: Successfully authenticated and returned token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 *         security: []  # Disables authentication for this specific endpoint
 */
DesignerRoute.post(
  "/login",
  validate(checkSchema(loginAdminValidation)),
  designerLoginController
);


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
