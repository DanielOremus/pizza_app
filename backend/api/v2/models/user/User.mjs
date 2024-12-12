import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import Role from "../role/Role.mjs"
import CartManager from "../cart/CartManager.mjs"
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
    required: true,
  },
})
userSchema.set("toObject", { virtuals: true })
userSchema.set("toJSON", { virtuals: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(this.password, salt)
  this.password = passwordHash
  next()
})

userSchema.post("save", async function (doc) {
  const cart = await CartManager.getOne({ customer: doc._id })
  if (!cart) await CartManager.create({ customer: doc._id, mealsList: [] })
})

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema)
