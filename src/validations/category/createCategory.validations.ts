export const createCategoryValidation = {
  name: {
    notEmpty: true,
    errorMessage: "name for this category cannot be empty",
  },
  description: {
    notEmpty: true,
    errorMessage: "description for this category cannot be empty",
  },
}