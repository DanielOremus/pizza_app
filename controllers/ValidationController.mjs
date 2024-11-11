import { validationResult } from "express-validator"
import CategoryManager from "../models/category/CategoryManager.mjs"

class ValidationController {
  static async validateMealFields(req, res) {
    const id = req.params.id
    const mealNewProps = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      if (id) mealNewProps.id = id
      return res.status(400).render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        meal: mealNewProps,
        categories: await CategoryManager.getList(),
        errors: errors.array(),
      })
    }
    return res.json({ success: true })
  }
}

export default ValidationController
