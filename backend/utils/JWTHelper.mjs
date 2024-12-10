import jwt from "jsonwebtoken"
import config from "../config/default.mjs"
class JWTHelper {
  static expiresIn = "24h"
  static prepareToken(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: JWTHelper.expiresIn,
    })
  }
}

export default JWTHelper
