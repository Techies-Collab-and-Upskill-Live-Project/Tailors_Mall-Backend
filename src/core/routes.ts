import { Application } from "express";
import AdminRouter from "../files/admin/admin.route";
import AuthRouter from "../files/auth/auth.route";
import ClientRoute from "../files/user/clients/client.route";
import DesignerRoute from "../files/user/designer/designer.route";
import UserRouter from "../files/user/general/general.route";

// Routes goes here
export const routes = (app: Application) => {
  const base = "/api/v1"

  app.use(`${base}/admin`, AdminRouter) 
  app.use(`${base}/user`, UserRouter) 
  app.use(`${base}/auth`, AuthRouter)
  app.use(`${base}/client`, ClientRoute)
  app.use(`${base}/designer`, DesignerRoute)
}