import CategoryManager from "../models/category/CategoryManager.mjs"

class CategoryController {
  static async getList(req, res) {
    try {
      const { categoryList, count } = await CategoryManager.getList()
      res.json({ success: true, data: categoryList })
    } catch (error) {
      res.status(500).json({ success: false, error })
    }
  }
}

export default CategoryController
