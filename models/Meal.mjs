import mongoose from "mongoose"

mongoose.Promise = global.Promise

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [5, "Title must be at least 3 chars long"],
    maxlength: [20, "Title must be at most 10 chars long"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imgSrc: String,

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1"],
    max: [1000000000, "Price must be at most 9 chars long"],
    toInt: true,
  },
})

export default new mongoose.model("Meal", mealSchema)
