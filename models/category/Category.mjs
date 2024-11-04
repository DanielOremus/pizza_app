import mongoose, { Schema } from "mongoose"

const categorySchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
})

export default new mongoose.model("Category", categorySchema)
