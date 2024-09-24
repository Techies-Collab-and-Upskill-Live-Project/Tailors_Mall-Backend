export const createJobValidation = {
  clientId: {
    notEmpty: true,
    errorMessage: "clientId cannot be empty",
  },
  title: {
    notEmpty: true,
    errorMessage: "title cannot be empty",
  },
  category: {
    notEmpty: true,
    errorMessage: "category for cannot be empty",
  },
  jobType: {
    notEmpty: true,
    errorMessage: "jobType for cannot be empty",
  },
  description: {
    notEmpty: true,
    errorMessage: "description for cannot be empty",
  },
  requiredSkills: {
    notEmpty: true,
    errorMessage: "requiredSkills for cannot be empty",
  },
  qualification: {
    notEmpty: true,
    errorMessage: "qualification for cannot be empty",
  },
  budget: {
    notEmpty: true,
    errorMessage: "budget for cannot be empty",
  },
  timeLine: {
    notEmpty: true,
    errorMessage: "timeLine for cannot be empty",
  },
}