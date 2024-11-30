import mongoose, { Schema } from "mongoose"

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User must be attached"],
    ref: "User",
  },
  rate: {
    type: Number,
    required: [true, "Rate is required"],
    min: [1, "Review cannot be lower than 1"],
    max: [5, "Review cannot be greater than 5"],
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Review text is required"],
    minLength: [10, "Review text must contain at least 10 chars"],
  },
  meal: {
    type: Schema.Types.ObjectId,
    required: [true, "Meal must be attached"],
    ref: "Meal",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model("Review", reviewSchema)
