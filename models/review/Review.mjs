import mongoose, { Schema } from "mongoose"

const reviewSchema = new Schema({
  critic: {
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
    minLength: [10, "Review text must contain at leaste 10 chars"],
  },
  meal: {
    type: Schema.Types.ObjectId,
    required: [true, "Meal must be attached"],
    ref: "Meal",
  },
})

export default mongoose.model("Review", reviewSchema)
