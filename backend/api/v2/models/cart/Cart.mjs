import mongoose from "mongoose"

const mealCartSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: [true, "Meal must be attached"],
  },
  amount: {
    type: Number,
    default: 1,
    min: [1, "Amount must be a positive number"],
    required: [true, "Amount is required"],
  },
})
const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be attached"],
  },
  mealsList: [mealCartSchema],
})

export default mongoose.model("Cart", cartSchema)
