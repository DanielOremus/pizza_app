import CategoryManager from "../models/category/CategoryManager.mjs"

class CategoryController {
  static async getList(req, res) {
    try {
      const list = await CategoryManager.getList()
      res.json({ success: true, data: list })
    } catch (error) {
      res.status(500).json({ success: false, error })
    }
  }
}

export default CategoryController
