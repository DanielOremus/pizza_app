import Review from "./Review.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class ReviewManager extends MongooseCRUDManager {
  async getList(
    filters = {},
    projection = {},
    options = {},
    populateFields = []
  ) {
    try {
      return await super.getList(filters, projection, options, populateFields)
    } catch (error) {
      return []
    }
  }
  async getById(id, projection = {}, populateFields = []) {
    try {
      const meal = await super.getById(id, projection, populateFields)
      return meal
    } catch (err) {
      console.log(err)
    }
  }
}

export default new ReviewManager(Review)
