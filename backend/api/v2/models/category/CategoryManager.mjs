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
      const { documents, count } = await super.getList(
        filters,
        projection,
        options,
        populateFields
      )
      return { categoryList: documents, count }
    } catch (error) {
      return []
    }
  }
}

export default new CategoryManager(Category)
