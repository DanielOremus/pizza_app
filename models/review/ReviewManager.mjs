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
      const list = await super.getList(
        filters,
        projection,
        options,
        populateFields
      )
      console.log(list)

      return list
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
