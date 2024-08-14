import { Application } from "express";
import AdminRouter from "../files/admin/admin.route";
import AuthRouter from "../files/auth/auth.route";
import UserRoute from "../files/user/user.route";

// Routes goes here
export const routes = (app: Application) => {
  const base = "/api/v1"

  app.use(`${base}/admin`, AdminRouter) 
  app.use(`${base}/auth`, AuthRouter)
  app.use(`${base}/user`, UserRoute)
}