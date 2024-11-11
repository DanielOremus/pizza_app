import Review from "./Review.mjs"

class ReviewManager {
  static async getList(searchParams = {}) {
    try {
      const reviews = await Review.find(searchParams).populate("user")

      return reviews
    } catch (error) {
      return []
    }
  }
  static async getById(id) {
    try {
      return await Review.findById(id)
    } catch (error) {
      console.log(error)
    }
  }
  static async create(reviewProps) {
    try {
      return await Review.create(reviewProps)
    } catch (error) {
      throw error
    }
  }
  static async updateById(id, props) {
    try {
      return await Review.findByIdAndUpdate(id, props, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw error
    }
  }
  static async deleteById(id) {
    try {
      return await Review.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }
  static async deleteMany(params) {
    try {
      return await Review.deleteMany(params)
    } catch (error) {
      throw error
    }
  }
}

export default ReviewManager
