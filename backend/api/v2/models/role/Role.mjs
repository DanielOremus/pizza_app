import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model("Role", roleSchema)
