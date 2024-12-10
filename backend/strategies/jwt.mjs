import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"
import config from "../config/default.mjs"
import UserManager from "../api/v2/models/user/UserManager.mjs"

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
}

export default new JWTStrategy(options, async (jwtPayload, done) => {
  console.log(jwtPayload)

  try {
    const user = await UserManager.getById(jwtPayload._id, { password: 0 })
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})
