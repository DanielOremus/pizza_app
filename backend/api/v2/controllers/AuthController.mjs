import RoleManager from "../models/role/RoleManager.mjs"
import JWTHelper from "../../../utils/JWTHelper.mjs"
import UserManager from "../models/user/UserManager.mjs"
import { validationResult } from "express-validator"
class AuthController {
  static async signup(req, res) {
    const { email, password, firstName, lastName } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const newUser = { email, password, firstName, lastName }
    try {
      const user = await UserManager.create(newUser)
      const payload = { _id: user._id }
      const token = JWTHelper.prepareToken(payload, req.headers)

      res.json({
        success: true,
        data: {
          token,
        },
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: error.message,
      })
    }
  }
  static async login(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong",
        errors: errors.array(),
      })
    }

    const { email, password } = req.body
    try {
      const user = await UserManager.getOne({ email })
      if (!user)
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect email or password" })

      const isMatch = await user.validatePassword(password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect email or password" })
      }

      const payload = { _id: user._id }
      const token = JWTHelper.prepareToken(payload, req.headers)

      res.json({
        success: true,
        data: {
          token,
        },
      })
    } catch (error) {
      return res.status(500).json({ success: false, msg: err.message })
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
