// import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import UserManager from "../models/user/UserManager.mjs"
// import User from "../models/user/User.mjs"
import bcrypt from "bcrypt"

export default new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await UserManager.getOne({ email }, {}, ["role"])
      if (!user)
        return done(null, false, { message: "Incorrect email or password" })
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect)
        return done(null, false, { message: "Incorrect email or password" })
      done(null, user)
    } catch (error) {
      done(error)
    }
  }
)
