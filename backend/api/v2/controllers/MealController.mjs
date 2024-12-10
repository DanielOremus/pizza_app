import { validationResult } from "express-validator"
import CategoryManager from "../models/category/CategoryManager.mjs"
import MealManager from "../models/meal/MealManager.mjs"
import ReviewManager from "../models/review/ReviewManager.mjs"
import UserManager from "../models/user/UserManager.mjs"
import { optimizeImage } from "../../../utils/ImageManager.mjs"

class MealController {
  static startPage = 0
  static defaultPerPage = 8

  static async getList(req, res) {
    try {
      let { page, perPage } = req.query
      if (!isFinite(page)) page = MealController.startPage
      if (!isFinite(perPage)) perPage = MealController.defaultPerPage

      req.query.page = page
      req.query.perPage = perPage

      const { mealList, count } = await MealManager.findManyWithQuery(
        req.query,
        {},
        ["category"]
      )

      res.json({
        success: true,
        data: {
          items: mealList,
          totalItems: count,
          currentPage: parseInt(page),
          perPage: parseInt(perPage),
        },
      })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
      // res.status(500).render("error", { error: err })
    }
  }

  static async getSpecific(req, res) {
    try {
      const meal = await MealManager.getById(req.params.id, {}, ["category"])

      if (!meal)
        return res.status(404).json({ success: false, msg: "Meal not found" })

      const { reviewList, count } = await ReviewManager.getList(
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
      return res.json({
        success: true,
        data: { meal, reviews: reviewList },
      })
    } catch (err) {
      res.status(500).json({ success: false, error: err })
    }
  }
  static async updateMeal(req, res) {
    const id = req.params.id
    const { title, description, price, category } = req.body
    const mealNewProps = { title, description, price, category }

    const errors = validationResult(req)

    let meal = null
    if (!errors.isEmpty()) {
      if (id) mealNewProps.id = id
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    if (req.file?.buffer) {
      const optimizedBuffer = await optimizeImage(req.file.buffer, 800)
      mealNewProps.image =
        `data:${req.file.mimetype};base64,` + optimizedBuffer.toString("base64")
    }

    try {
      if (id) {
        meal = await MealManager.updateById(id, mealNewProps)
      } else {
        meal = await MealManager.create(mealNewProps)
      }

      res.json({ success: true, data: meal })
    } catch (err) {
      console.log(err)

      return res.status(500).json({ success: false, error: err })
    }
  }
  static async deleteMeal(req, res) {
    try {
      const { id } = req.body
      const meal = await MealManager.deleteById(id)
      if (!meal)
        return res
          .status(404)
          .json({ success: false, msg: "Delete failed, meal not found" })
      // removeImageSync(meal, "uploads")
      // await MealManager.delete(id)
      await ReviewManager.deleteMany({ meal: meal._id })
      res.json({ success: true, data: meal })
    } catch (err) {
      res.status(500).json({ success: false, error: err.message })
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
