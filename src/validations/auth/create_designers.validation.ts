const createDesignersValidation = {
  fullName: {
    notEmpty: true,
    errorMessage: "Full Name cannot be empty",
    trim: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Email cannot be empty",
    trim: true,
  },
  phoneNumber: {
    notEmpty: true,
    errorMessage: "Phone number cannot be empty",
    trim: true,
  },
  password: {
    notEmpty: true,
    errorMessage: "Password cannot be empty",
  },
  country: {
    notEmpty: true,
    errorMessage: "Country cannot be empty",
    trim: true,
  },
  hearPlatformInfo: {
    notEmpty: true,
    errorMessage: "Please enter an answer for where you heard of our platform",
    trim: true,
  },
}

export default createDesignersValidation
