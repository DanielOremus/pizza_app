import Category from "./Category.mjs"

class CategoryManager {
  static async loadList() {
    try {
      return await Category.find()
    } catch (error) {
      console.log(error)
    }
  }
}

export default CategoryManager
