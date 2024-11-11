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
})

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.model("User", userSchema)
