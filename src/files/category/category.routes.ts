import express from "express"
import validate from "../../validations/validate"
import { checkSchema } from "express-validator"

import { isAuthenticated } from "../../utils"
import categoryController from "./category.controller"
import { createCategoryValidation } from "../../validations/category/createCategory.validations"

const CategoryRouter = express.Router()

const {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = categoryController

CategoryRouter.use(isAuthenticated)
//routes
CategoryRouter.post(
  "/",
  validate(checkSchema(createCategoryValidation)),
  createCategoryController,
)
CategoryRouter.get("/", getCategoryController)
CategoryRouter.put("/:id", updateCategoryController)
CategoryRouter.put("/delete/:id", deleteCategoryController)

export default CategoryRouter
