import passport from "passport"
import LocalStrategy from "../strategies/local.mjs"
import JWTStrategy from "../strategies/jwt.mjs"
import UserManager from "../api/v2/models/user/UserManager.mjs"

// passport.use(LocalStrategy)
passport.use(JWTStrategy)
// passport.serializeUser((user, done) => {
//   done(null, user._id)
// })

// passport.deserializeUser(async (userId, done) => {
//   try {
//     const user = await UserManager.getById(userId, {}, ["role"])
//     done(null, user)
//   } catch (error) {
//     done(error)
//   }
// })

export default passport
