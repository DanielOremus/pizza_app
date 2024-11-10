import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.model("User", userSchema)
