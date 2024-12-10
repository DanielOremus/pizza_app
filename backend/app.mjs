import express from "express"
import connectDB from "./db/connectDB.mjs"
import initializeMiddlewares from "./middlewares/initialize.mjs"
import errorHandler from "./middlewares/errorHandler.mjs"
import sessionConfig from "./config/session.mjs"
import routes from "./api/v2/routes/index.mjs"

const app = express()

//Connection to DB
connectDB()
//Required Middlewares for whole app
initializeMiddlewares(app)
//Connecting routes
app.use("/v2", routes)
//Error handler
errorHandler(app)

//Passport + Session + Cookie
// app.use(sessionConfig)

export default app
