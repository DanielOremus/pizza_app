import Meal from "./Meal.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class MealManager extends MongooseCRUDManager {
  static fieldsConfiguration = [
    { fieldName: "title", filterCategory: "search" },
    { fieldName: "price", filterCategory: "range" },
    { fieldName: "category", filterCategory: "list" },
  ]
  // async getList(
  //   filters = {},
  //   projection = null,
  //   options = null,
  //   populateFields = []
  // ) {
  //   try {
  //     if (filters.title) {
  //       filters.title = new RegExp(`${filters.title}`, "i")
  //     }
  //     const { documents, count } = await super.getList(
  //       filters,
  //       projection,
  //       options,
  //       populateFields
  //     )

  //     return { mealList: documents, count }
  //   } catch (err) {
  //     return []
  //   }
  // }

  async findManyWithQuery(reqQuery, projection = null, populateFields = []) {
    try {
      const { documents, count } = await super.findManyWithQuery(
        reqQuery,
        MealManager.fieldsConfiguration,
        projection,
        populateFields
      )

      return { mealList: documents, count }
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
