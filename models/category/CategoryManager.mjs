import Category from "./Category.mjs"

class CategoryManager {
  static async getList() {
    try {
      return await Category.find()
    } catch (error) {
      console.log(error)
    }
  }
}

export default CategoryManager
