import { checkSchema } from "express-validator";

// Validation schema for creating a portfolio item
export const createPortfolioItemValidation = checkSchema({
  mediaType: {
    notEmpty: {
      errorMessage: "Media type is required",
    },
    isIn: {
      options: [["image", "video"]],
      errorMessage: "Media type must be either 'image' or 'video'",
    },
  },
  mediaURL: {
    notEmpty: {
      errorMessage: "Media URL cannot be empty",
    },
    isURL: {
      errorMessage: "Media URL must be a valid URL",
    },
  },
  description: {
    optional: true,
    isLength: {
      options: { min: 5, max: 200 },
      errorMessage: "Description must be between 5 to 200 characters",
    },
  },
  portfolioName: {
    notEmpty: {
      errorMessage: "Portfolio name is required",
    },
    isLength: {
      options: { min: 1, max: 100 }, // Assuming the maximum length is 100 characters
      errorMessage: "Portfolio name must be between 1 to 100 characters",
    },
  },
  collaborators: {
    optional: true,
    isArray: {
      errorMessage: "Collaborators must be an array of strings",
    },
    custom: {
      options: (value) => {
        // Check if each item in the array is a string
        return value.every((collaborator: any) => typeof collaborator === "string");
      },
      errorMessage: "Each collaborator must be a string",
    },
  },
});

// Validation schema for updating a portfolio item
export const updatePortfolioItemValidation = checkSchema({
  mediaType: {
    optional: true,
    isIn: {
      options: [["image", "video"]],
      errorMessage: "Media type must be either 'image' or 'video'",
    },
  },
  mediaURL: {
    optional: true,
    isURL: {
      errorMessage: "Media URL must be a valid URL",
    },
  },
  description: {
    optional: true,
    isLength: {
      options: { min: 5, max: 200 },
      errorMessage: "Description must be between 5 to 200 characters",
    },
  },
  portfolioName: {
    optional: true,
    isLength: {
      options: { min: 1, max: 100 }, // Assuming the maximum length is 100 characters
      errorMessage: "Portfolio name must be between 1 to 100 characters",
    },
  },
  collaborators: {
    optional: true,
    isArray: {
      errorMessage: "Collaborators must be an array of strings",
    },
    custom: {
      options: (value) => {
        // Check if each item in the array is a string
        return value.every((collaborator: any) => typeof collaborator === "string");
      },
      errorMessage: "Each collaborator must be a string",
    },
  },
});

// Validation schema for deleting a portfolio item
export const deletePortfolioItemValidation = checkSchema({
  id: {
    notEmpty: true,
    isMongoId: {
      errorMessage: "ID must be a valid MongoDB ObjectId",
    },
    errorMessage: "Portfolio item ID cannot be empty",
  },
});

