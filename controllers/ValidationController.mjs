import { validationResult } from "express-validator"
import CategoryManager from "../models/category/CategoryManager.mjs"

class ValidationController {
  static async validateMealFields(req, res) {
    const id = req.params.id
    const mealNewProps = req.body
    console.log(mealNewProps)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors)
      if (id) mealNewProps.id = id
      return res.status(400).render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        meal: mealNewProps,
        categories: await CategoryManager.loadList(),
        errors: errors.array(),
      })
    }
    return res.send("ok")
  }
}

export default ValidationController
