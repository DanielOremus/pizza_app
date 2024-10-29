import config from "../config/default.mjs"
import mongoose from "mongoose"

export default async function () {
  try {
    console.log(config.mongoURI)

    await mongoose.connect(config.mongoURI)
    console.log("Successfully connected to DB")
  } catch (error) {
    console.log("Connection to DB failed ", error)
  }
}
