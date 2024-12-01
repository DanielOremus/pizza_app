import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
  db: {
    databaseName: process.env.DB_NAME,
    databaseUrl: process.env.DB_URL,
    mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
    port: process.env.PORT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})
