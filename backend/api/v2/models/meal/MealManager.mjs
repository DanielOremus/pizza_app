import Meal from "./Meal.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class MealManager extends MongooseCRUDManager {
  async getList(
    filters = {},
    projection = null,
    options = null,
    populateFields = []
  ) {
    try {
      if (filters.title) {
        filters.title = new RegExp(`${filters.title}`, "i")
      }
      const list = await super.getList(
        filters,
        projection,
        options,
        populateFields
      )
      return list
    } catch (err) {
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

export default new MealManager(Meal)
