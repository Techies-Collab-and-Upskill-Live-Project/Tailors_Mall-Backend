// src/modules/portfolio/portfolio.route.ts

import express from "express";
import PortfolioController from "./portfolio.controller";
import { isAuthenticated } from "../../utils";
import validate from "../../validations/validate";
import {
  createPortfolioItemValidation,
  updatePortfolioItemValidation,
  deletePortfolioItemValidation,
} from "../../validations/portfolio/portfolio.validation";

const PortfolioRouter = express.Router();

const {
  createPortfolioItemController,
  fetchPortfolioItemsController,
  updatePortfolioItemController,
  deletePortfolioItemController,
} = PortfolioController;

// Ensure the user is authenticated for all routes
PortfolioRouter.use(isAuthenticated);

// Portfolio routes
PortfolioRouter.post(
  "/",
  validate(createPortfolioItemValidation),
  createPortfolioItemController,
);

PortfolioRouter.get("/", fetchPortfolioItemsController);

PortfolioRouter.put(
  "/:id",
  validate(updatePortfolioItemValidation),
  updatePortfolioItemController,
);

PortfolioRouter.delete(
  "/:id",
  validate(deletePortfolioItemValidation),
  deletePortfolioItemController,
);

export default PortfolioRouter;

