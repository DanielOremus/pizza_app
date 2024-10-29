import { checkSchema, validationResult } from "express-validator"

class MealValidator {
  static schema = {
    title: {
      notEmpty: {
        errorMessage: "Title is required",
        bail: true,
      },
      isLength: {
        options: {
          min: 5,
        },
        errorMessage: "Title must be at least 5 chars",
      },
      trim: true,
      escape: true,
    },
    price: {
      isNumeric: {
        errorMessage: "Price must be a number",
        bail: true,
      },
      isInt: {
        options: {
          min: 1,
        },
        errorMessage: "Price must be at least 1₴",
      },
      trim: true,
      escape: true,
      toInt: true,
    },
  }
}

export default MealValidator
