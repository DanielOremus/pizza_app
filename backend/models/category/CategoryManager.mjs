import MongooseCRUDManager from "../MongooseCRUDManager.mjs"
import Category from "./Category.mjs"

class CategoryManager extends MongooseCRUDManager {
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
}

export default new CategoryManager(Category)
