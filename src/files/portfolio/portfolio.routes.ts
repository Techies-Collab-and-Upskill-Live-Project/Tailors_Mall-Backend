import express from "express";
import { isAuthenticated } from "../../utils";
import portfolioController from "./portfolio.controller";
import uploadManager from "../../utils/multer";
import validate from "../../validations/validate";
import { checkSchema } from "express-validator";
import { createPortfolioValidation } from "../../validations/portfolio/createPortfolio.validations";

const PortfolioRouter = express.Router();

const {
  createPortfolioController,
  getPortfolioController,
  updatePortfolioController,
  deletePortfolioController,
  toggleLikePortfolio,
} = portfolioController;

PortfolioRouter.use(isAuthenticated)
//routes
PortfolioRouter.post(
  "/",
  // validate(checkSchema(createPortfolioValidation)),
  uploadManager("Portfolio").fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
    { name: "coverImage", maxCount: 1 }
  ]),
  createPortfolioController,
)
PortfolioRouter.get(
  "/", getPortfolioController
)
PortfolioRouter.put(
  "/update/:id", 
  uploadManager("Portfolio").fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
    { name: "coverImage", maxCount: 1 }
  ]),
  updatePortfolioController
)
PortfolioRouter.delete("/delete/:id", deletePortfolioController)
PortfolioRouter.post("/like/:portfolioId", toggleLikePortfolio)

export default PortfolioRouter