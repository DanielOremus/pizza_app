import { validationResult } from "express-validator"
import CategoryManager from "../models/category/CategoryManager.mjs"
import MealManager from "../models/meal/MealManager.mjs"
import ReviewManager from "../models/review/ReviewManager.mjs"
import UserManager from "../models/user/UserManager.mjs"
import { removeImageSync } from "../utils/ImageManager.mjs"
import User from "../models/user/User.mjs"

class MealController {
  static async loadList(req, res) {
    try {
      const queryParams = {}

      for (const key in req.query) {
        if (req.query[key]) queryParams[key] = req.query[key]
      }
      const mealList = await MealManager.getList(queryParams, {}, {}, [
        "category",
      ])

      const categoryList = await CategoryManager.getList()
      res.render("layouts/main", {
        title: "Menu",
        body: "../meals/menu",
        categoryList,
        mealList,
        user: req.user,
      })
      // res.json({ success: true, data: mealList })
    } catch (err) {
      // res.status(500).json({ success: false, msg: err })
      res.status(500).render("error", { error: err })
    }
  }
  static async renderSpecific(req, res) {
    try {
      const meal = await MealManager.getById(req.params.id, {}, ["category"])

      if (!meal)
        return res.status(404).render("error", { error: "Meal not found" })

      const reviews = await ReviewManager.getList(
        { meal: meal._id },
        { meal: 0 },
        { sort: { createdAt: -1 } },
        [
          {
            fieldForPopulation: "user",
            requiredFieldsFromTargetObj: "firstName lastName fullName",
          },
        ]
      )

      return res.render("layouts/main", {
        title: meal.title,
        body: "../meals/spec_meal",
        meal,
        reviews,
        user: req.user,
        formData: null,
        errors: [],
      })
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
        await MealManager.updateById(id, mealNewProps)
      } else {
        await MealManager.create(mealNewProps)
      }

      res.redirect("/menu")
    } catch (err) {
      return res.status(400).render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        meal: mealNewProps,
        user: req.user,
        categories: await CategoryManager.getList(),
        errors: [{ msg: err.message }],
      })
    }
  }
  static async deleteMeal(req, res) {
    try {
      const { id } = req.body
      const meal = await MealManager.deleteById(id)
      if (!meal)
        return res
          .status(404)
          .render("error", { error: "Delete failed, meal not found" })
      removeImageSync(meal, "uploads")
      // await MealManager.delete(id)
      await ReviewManager.deleteMany({ meal: meal._id })
      res.json({ success: true })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async renderForm(req, res) {
    try {
      console.log(req.user)

      const { id } = req.params
      let mealObj = null
      if (id) {
        mealObj = await MealManager.getById(id)
      }
      res.render("layouts/main", {
        title: "Form",
        body: "../meals/form",
        user: req.user,
        categories: await CategoryManager.getList(),
        meal: mealObj,
        errors: [],
      })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
  static async addReview(req, res) {
    // const id = req.body.mealId
    const id = req.params.id

    const { rate, text } = req.body
    const user = req.user

    try {
      const meal = await MealManager.getById(id)
      if (!meal) {
        return res.status(404).json({ success: false, msg: "Meal not found" })
      }
      const reviews = await ReviewManager.getList(
        { meal: meal._id },
        { meal: 0 },
        { sort: { createdAt: -1 } },
        [
          {
            fieldForPopulation: "user",
            requiredFieldsFromTargetObj: "firstName lastName fullName",
          },
        ]
      )
      const errors = validationResult(req)

      console.log(errors)

      if (!errors.isEmpty()) {
        return res.status(400).render("layouts/main", {
          title: meal.title,
          body: "../meals/spec_meal",
          meal,
          user,
          formData: {
            rate,
            text,
          },
          reviews,
          users: await UserManager.getList(),
          errors: errors.array(),
        })
      }
      await ReviewManager.create({
        user: user._id,
        rate,
        text,
        meal: meal._id,
      })

      res.redirect(`/menu/${meal.id}`)
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async deleteReview(req, res) {
    try {
      const { id } = req.body
      const review = await ReviewManager.deleteById(id)
      if (!review)
        return res
          .status(404)
          .render("error", { error: "Delete failed, meal not found" })
      res.json({ success: true })
    } catch (err) {
      res.status(500).render("error", { error: err })
    }
  }
}

export default MealController
