import express, { NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { routes } from "./routes";
import { handleApplicationErrors, notFound } from "./response";
import passport from 'passport';
import session from 'express-session';
import ClientRoute from "../files/user/clients/client.route";
import DesignerRoute from "../files/user/designer/designer.route";
import passportConfig from "../utils/passportConfig";
import designer from "../files/user/designer/designer.model";
import client from "../files/user/clients/client.model";

export const app = express();

export const application = async () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(express.static("public"))
  app.use("/images", express.static("images"))

  app.set('view engine','ejs');

  // Route for Client Authentication
  app.use('/auth/client', ClientRoute);

  // Route for Designer Authentication
  app.use('/auth/designer', DesignerRoute);

  app.use(
    session({ 
      secret: 'I am Batman', 
      resave: false, 
      saveUninitialized: true 
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/home", (req, res) => {
    res.status(200).json({ message: "App working fine. Welcome" })
  })

  app.get("/", (req, res) => {
    res.render("login");
  })

  app.get("/log", (req,res)=>{
    res.render('index',{userinfo:req.user})
  })

  routes(app)
  app.use(handleApplicationErrors) //application errors handler
  app.use(notFound) //not found route
}