import session from "express-session"
import config from "./default.mjs"
console.log(config.session.secret)

export default session({
  secret: config.session.secret,
  cookie: {
    maxAge: 24 * 3600 * 1000,
  },
  resave: false,
  saveUninitialized: false,
})
