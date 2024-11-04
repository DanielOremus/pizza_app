import CategoryManager from "../models/category/CategoryManager.mjs"
import MealManager from "../models/meal/MealManager.mjs"
import { removeImageSync } from "../utils/ImageManager.mjs"

class MealController {
  static async getList(req, res) {
    try {
      const mealList = await MealManager.loadList()
      res.render("layouts/main", {
        title: "Menu",
        body: "../meals/menu",
        mealList,
      })
      // res.json({ success: true, data: mealList })
    } catch (err) {
      // res.status(500).json({ success: false, msg: err })
      res.status(500).render("error", { error: err })
    }
  }
  static async getMealDetails(req, res) {
    try {
      const meal = await MealManager.getById(req.params.id)
      if (!meal)
        return res.status(404).render("error", { error: "Meal not found" })
      return res.render("meals/spec_meal", { meal })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async updateMeal(req, res) {
    const id = req.params.id
    const { title, description, price, category } = req.body
    const mealNewProps = { title, description, price, category }
    if (req.file) {
      const meal = await MealManager.getById(id)
      removeImageSync(meal, "uploads")
      mealNewProps.imgSrc = req.file.filename
    }
    try {
      if (id) {
        await MealManager.update(id, mealNewProps)
      } else {
        await MealManager.add(mealNewProps)
      }
      console.log(111)

      res.redirect("/menu")
    } catch (err) {
      console.log(mealNewProps)
      console.log(err.message)

      return res.status(400).render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        meal: mealNewProps,
        categories: await CategoryManager.loadList(),
        errors: [{ msg: err.message }],
      })
    }
  }
  static async deleteMeal(req, res) {
    try {
      const { id } = req.body
      const meal = await MealManager.delete(id)
      if (!meal)
        return res
          .status(404)
          .render("error", { error: "Delete failed, meal not found" })
      removeImageSync(meal, "uploads")
      await MealManager.delete(id)
      res.json({ success: true })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async renderForm(req, res) {
    try {
      const { id } = req.params
      let mealObj = null
      if (id) {
        mealObj = await MealManager.getById(id)
      }
      res.render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        categories: await CategoryManager.loadList(),
        meal: mealObj,
        errors: [],
      })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
}

export default MealController
