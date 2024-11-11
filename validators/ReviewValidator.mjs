class ReviewValidator {
  static schema = {
    user: {
      notEmpty: {
        errorMessage: "User must me attached",
      },
      trim: true,
      escape: true,
    },
    rate: {
      isNumeric: {
        errorMessage: "Rate must be a number",
        bail: true,
      },
      isInt: {
        options: {
          min: 1,
          max: 5,
        },
        errorMessage: "Rate must be from 1 up to 5 stars",
      },
      toInt: true,
    },
    text: {
      notEmpty: {
        errorMessage: "Comment is required",
        bail: true,
      },
      isLength: {
        options: {
          min: 10,
        },
        errorMessage: "Comment must be at least 10 chars long",
      },
      trim: true,
    },
  }
}

export default ReviewValidator
