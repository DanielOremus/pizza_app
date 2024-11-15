import config from "../config/default.mjs"
import mongoose from "mongoose"

export default async function () {
  try {
    await mongoose.connect(config.db.mongoURI)
    console.log("Successfully connected to DB")
  } catch (error) {
    console.log("Connection to DB failed ", error)
  }
}
