import MealModel from "../models/MealModel.mjs"
import { removeImageSync } from "../utils/ImageManager.mjs"

class MealController {
  static async getList(req, res) {
    try {
      const mealList = await MealModel.loadList()
      res.render("layouts/main", {
        title: "Menu",
        body: "../meals/menu",
        mealList,
      })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async getMealDetails(req, res) {
    try {
      const meal = await MealModel.getById(req.params.id)
      res.render("meals/spec_meal", { meal })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async updateMeal(req, res) {
    try {
      console.log(req.body)

      const id = req.params.id
      const mealNewProps = req.body

      if (req.file) {
        const mealObj = id ? await MealModel.getById(id) : null
        removeImageSync(mealObj, "uploads")
        mealNewProps.imgSrc = req.file.filename
      }
      if (id) {
        await MealModel.update(id, mealNewProps)
      } else {
        await MealModel.add(mealNewProps)
      }

      res.redirect("/menu")
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async deleteMeal(req, res) {
    try {
      const { id } = req.body
      const mealObj = await MealModel.getById(id)
      removeImageSync(mealObj, "uploads")
      await MealModel.delete(id)
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
        mealObj = await MealModel.getById(req.params.id)
      }
      res.render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        meal: mealObj,
        errors: [],
      })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
}

export default MealController
