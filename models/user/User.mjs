import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import Role from "../role/Role.mjs"
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: new mongoose.Types.ObjectId("67389b5b108ca03b51ba2d16"),
  },
})
userSchema.set("toObject", { virtuals: true })
userSchema.set("toJSON", { virtuals: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  console.log("Save")
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(this.password, salt)
  this.password = passwordHash
  next()
})
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.model("User", userSchema)
