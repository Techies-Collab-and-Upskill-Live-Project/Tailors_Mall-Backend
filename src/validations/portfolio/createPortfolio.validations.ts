export const createPortfolioValidation = {
  designerId: {
    notEmpty: true,
    errorMessage: "designerId cannot be empty",
  },
  name: {
    notEmpty: true,
    errorMessage: "name cannot be empty",
  },
  category: {
    notEmpty: true,
    errorMessage: "category for cannot be empty",
  },
  description: {
    notEmpty: true,
    errorMessage: "description for cannot be empty",
  },
}