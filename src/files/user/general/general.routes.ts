import express from "express"
import generalController from "./general.controller"

const UserRouter = express.Router()

const {
  searchCollectionController
} = generalController

UserRouter.get(
  "/search",
  searchCollectionController
)

export default UserRouter;