import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import passport from "../config/passport.mjs"
import sessionConfig from "../config/session.mjs"
import logger from "morgan"
import cors from "cors"
import mongooseSanitize from "express-mongo-sanitize"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

export default (app) => {
  app.set("views", path.join(__dirname, "../views"))
  app.set("view engine", "ejs")

  app.use(logger("dev"))
  app.use(mongooseSanitize())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  const corsOptions = {
    origin: "*", // або '*' для всіх доменів
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволені методи
    allowedHeaders: ["Content-Type", "Authorization"], // Дозволені заголовки
    credentials: true, // Якщо потрібно дозволити cookies
  }

  app.use(cors(corsOptions))

  app.use(express.static(path.join(__dirname, "../public")))
  app.use(express.static(path.join(__dirname, "../uploads")))

  // app.use(sessionConfig)
  app.use(passport.initialize())
  // app.use(passport.session())
  // app.use(passport.)

  // app.use(flash())
}
