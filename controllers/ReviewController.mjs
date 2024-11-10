import { validationResult } from "express-validator"
import ReviewManager from "../models/review/ReviewManager.mjs"

class ReviewController {
  static async loadList(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  // static async add(req, res) {
  //   const { criticId, meal, rate, text } = req.body
  //   const mealObj = JSON.parse(meal)
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(400).render("layout/main", {
  //       body: "../meals/spec_meal",
  //       meal: JSON.parse(meal),
  //       rate,
  //       text,
  //       errors: errors.array(),
  //     })
  //   }
  //   try {
  //     await CriticReviewManager.add({
  //       critic: criticId,
  //       meal: mealId,
  //       rate,
  //       text,
  //     })
  //     res.render("layout/main", {
  //       body: "../meals/spec_meal",
  //       errors: [],
  //     })
  //   } catch (error) {}
  // }
}

export default ReviewController
