import express from "express"
import connectDB from "./db/connectDB.mjs"
import initializeMiddlewares from "./middlewares/initialize.mjs"
import errorHandler from "./middlewares/errorHandler.mjs"
import routes from "./routes/index.mjs"

const app = express()

//Connection to DB
connectDB()
//Required Middlewares for whole app
initializeMiddlewares(app)
//Connecting routes
app.use("/", routes)
//Error handler
errorHandler(app)

export default app
