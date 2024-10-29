import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
  databaseName: process.env.DB_NAME,
  databaseUrl: process.env.DB_URL,
  mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  port: process.env.PORT,
})
