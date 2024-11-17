import session from "express-session"
import config from "./default.mjs"

export default session({
  secret: config.session.secret,
  cookie: {
    maxAge: 24 * 3600 * 1000,
  },
  resave: false,
  saveUninitialized: false,
})
