class MealValidator {
  static schema = {
    trim: true,
    title: {
      notEmpty: {
        errorMessage: "Title is required",
        bail: true,
      },
      isLength: {
        options: {
          min: 1,
        },
        errorMessage: "Title must be at least 1 char",
      },
      escape: true,
    },
    description: {
      trim: true,
      notEmpty: {
        errorMessage: "Description is required",
        bail: true,
      },
      isLength: {
        options: {
          min: 10,
        },
        errorMessage: "Description must be at least 10 chars",
      },
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
      toInt: true,
    },
    category: {
      trim: true,
      notEmpty: {
        errorMessage: "Category is required",
      },
      escape: true,
    },
  }
}

export default MealValidator
