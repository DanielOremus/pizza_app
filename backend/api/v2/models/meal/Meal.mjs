import mongoose, { Schema } from "mongoose"

mongoose.Promise = global.Promise

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [1, "Title must be at least 1 chars long"],
    maxlength: [20, "Title must be at most 20 chars long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Title is required"],
    minlength: [10, "Description must be at least 10 chars long"],

    trim: true,
  },
  image: String,

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1"],
    max: [1000000000, "Price must be at most 9 chars long"],
    toInt: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: [true, "Category is required"],
    ref: "Category",
  },
})

export default mongoose.model("Meal", mealSchema)
