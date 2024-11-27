import passport from "passport"
import LocalStrategy from "../strategies/local.mjs"
import UserManager from "../models/user/UserManager.mjs"

passport.use(LocalStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await UserManager.getById(userId, {}, ["role"])
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport
