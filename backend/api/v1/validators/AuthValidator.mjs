import UserManager from "../models/user/UserManager.mjs"

class AuthValidator {
  static loginSchema = {
    email: {
      trim: true,
      notEmpty: {
        bail: true,
        errorMessage: "Email is required",
      },
      isEmail: {
        bail: true,
        errorMessage: "Oops! That doesn’t look like a valid email address.",
      },

      normalizeEmail: true,
    },
    password: {
      trim: true,
      notEmpty: {
        negated: true,
        errorMessage: "Password is required",
      },
    },
  }
  static signupSchema = {
    firstName: {
      trim: true,
      isLength: {
        options: {
          min: 1,
        },
        errorMessage: "First Name must be at least 1 character long",
      },
      escape: true,
    },
    lastName: {
      trim: true,
      isLength: {
        options: {
          min: 1,
        },
        errorMessage: "Last Name must be at least 1 character long",
      },
      escape: true,
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "Email is required",
        bail: true,
      },
      isEmail: {
        errorMessage: "Oops! That doesn’t look like a valid email address.",
      },
      custom: {
        options: async (value) => {
          const user = await UserManager.getOne(
            { email: { $eq: value } },
            { _id: 1 }
          )
          if (user) {
            throw new Error("Email is already in use")
          }
          return true
        },
      },
      normalizeEmail: true,
    },
    password: {
      trim: true,
      matches: {
        options: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
        errorMessage:
          "Password must include 8+ characters, a letter, and a number",
      },
    },
  }
}

export default AuthValidator
