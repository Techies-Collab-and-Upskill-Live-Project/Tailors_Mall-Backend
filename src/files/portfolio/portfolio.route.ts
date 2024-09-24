import express from "express";
import { checkSchema } from "express-validator";
import PortfolioController from "./portfolio.controller";
import { isAuthenticated } from "../../utils";
import uploadManager from "../../utils/multer";
import { fileModifier } from "../../utils";

// Create a new router
const router = express.Router();

// Validation schema for creating and updating a portfolio item
const portfolioValidationSchema = {
  designerId: {
    in: ["body"],
    isMongoId: {
      errorMessage: "Invalid designer ID",
    },
    notEmpty: {
      errorMessage: "Designer ID is required",
    },
  },
  mediaType: {
    in: ["body"],
    isIn: {
      options: [['image', 'video']],
      errorMessage: "Media type must be either 'image' or 'video'",
    },
    notEmpty: {
      errorMessage: "Media type is required",
    },
  },
  mediaURL: {
    in: ["body"],
    isURL: {
      errorMessage: "Invalid media URL",
    },
    notEmpty: {
      errorMessage: "Media URL is required",
    },
  },
  description: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: "Description must be less than 1000 characters",
    },
  },
  tags: {
    in: ["body"],
    optional: true,
    isArray: {
      errorMessage: "Tags must be an array of strings",
    },
    custom: {
      options: (value) => value.every(tag => typeof tag === 'string'),
      errorMessage: "Each tag must be a string",
    },
  },
  categories: {
    in: ["body"],
    optional: true,
    isArray: {
      errorMessage: "Categories must be an array of strings",
    },
    custom: {
      options: (value) => value.every(category => typeof category === 'string'),
      errorMessage: "Each category must be a string",
    },
  },
  isFeatured: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "isFeatured must be a boolean",
    },
  },
  isPublic: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "isPublic must be a boolean",
    },
  },
};

// Routes
// Create a portfolio item
router.post(
  "/",
  isAuthenticated,
  uploadManager.single('media'), // Expecting a single file upload with the field name 'media'
  fileModifier, // Call the fileModifier function to handle the uploaded file
  checkSchema(portfolioValidationSchema),
  PortfolioController.createPortfolio
);

// Get all portfolio items
router.get("/", isAuthenticated, PortfolioController.getAllPortfolios);

// Get a portfolio item by ID
router.get("/:id", isAuthenticated, PortfolioController.getPortfolioById);

// Update a portfolio item
router.put(
  "/:id",
  isAuthenticated,
  checkSchema(portfolioValidationSchema),
  PortfolioController.updatePortfolio
);

// Delete a portfolio item
router.delete("/:id", isAuthenticated, PortfolioController.deletePortfolio);

// Export the router
export default router;

