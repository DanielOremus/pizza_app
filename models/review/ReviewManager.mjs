import Review from "./Review.mjs"

class ReviewManager {
  static async getList(searchParams = {}) {
    try {
      const reviews = await CriticReview.find().populate("user")

      console.log(reviews)

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
}

export default ReviewManager
