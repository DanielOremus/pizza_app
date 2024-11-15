import Meal from "./Meal.mjs"
import MongooseCRUDManager from "../MoongooseCRUDManager.mjs"

class MealManager extends MongooseCRUDManager {
  async getList(
    filters = {},
    projection = null,
    options = null,
    populateFields = []
  ) {
    try {
      const query = super.getList(filters, null, null, ["category"])
      if (searchParamsObj.category) {
        query.where("category").equals(searchParamsObj.category)
      }
      if (searchParamsObj.title) {
        query.where("title").regex(new RegExp(`${searchParamsObj.title}`, "i"))
      }

      return await query.exec()
    } catch (err) {
      return []
    }
  }
  async getById(id, projection = null, populateFields = []) {
    try {
      return await super.getById(id, null, ["category"])
    } catch (err) {
      console.log(err)
    }
  }
}

export default new MealManager(Meal)
