import passport from "passport"
import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"
class AuthController {
  static renderLogin(req, res) {
    res.render("auth/login", {
      title: "Login",
      errors: [],
    })
  }
  static renderSignUp(req, res) {
    res.render("auth/signup", {
      title: "Signup",
      errors: [],
    })
  }
  static login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err)
      if (!user)
        return res.status(400).render("auth/login", {
          title: "Login",
          errors: [{ msg: info.message }],
        })
      req.login(user, (err) => {
        if (err) return next(err)
        res.redirect("/menu")
      })
    })(req, res, next)
  }
  static async signup(req, res, next) {
    const { email, password, firstName, lastName } = req.body
    const newUser = { email, password, firstName, lastName }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", {
        title: "Sign Up",
        user: newUser,
        errors: errors.array(),
      })
    }
    try {
      const user = await UserManager.create(newUser)
      req.login(user, (err) => {
        if (err) return next(err)
        res.redirect("/")
      })
    } catch (error) {
      return res.status(400).render("auth/signup", {
        title: "Sign Up",
        user: newUser,
        errors: [{ msg: error.message }],
      })
    }
  }
  static logout(req, res) {
    req.logout(null, (err) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err.message })
      }
      res.redirect("/")
    })
  }
}

export default AuthController
