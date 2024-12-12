import { validationResult } from "express-validator"
import CartManager from "../models/cart/CartManager.mjs"
import UserManager from "../models/user/UserManager.mjs"

class CartController {
  static async getByUserId(req, res) {
    const userId = req.user._id
    try {
      const cart = await CartManager.getDetails(userId)
      if (!cart)
        return res.status(404).json({ success: false, msg: "Cart not found" })
      res.json({
        success: true,
        data: {
          cartDetails: cart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }

  static async addMealToCart(req, res) {
    console.log(req.body)

    const { mealId } = req.body
    const userId = req.user._id
    try {
      const updatedCart = await CartManager.addMeal(userId, mealId)
      res.json({
        success: true,
        data: {
          cartDetails: updatedCart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async updateMealAmount(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors })

    const userId = req.user._id
    console.log(req.body)

    const { mealId, amount } = req.body
    try {
      const updatedCart = await CartManager.updateMealAmount(
        userId,
        mealId,
        amount
      )
      if (!updatedCart)
        return res.status(404).json({ success: false, msg: "Cart not found" })

      res.json({
        success: true,
        data: {
          cartDetails: updatedCart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async deleteMealFromCart(req, res) {
    const { mealId } = req.body

    if (!mealId) {
      return res
        .status(400)
        .json({ success: false, msg: "MealId must be provided" })
    }
    const userId = req.user._id
    try {
      const cart = await CartManager.deleteMeal(userId, mealId)
      if (!cart)
        return res.status(404).json({ success: false, msg: "Cart not found" })
      res.json({
        success: true,
        data: {
          cartDetails: cart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  //! Do not use -------
  static async deleteCart(req, res) {
    const userId = req.params.userId

    try {
      const cart = await CartManager.deleteCartByUserId(userId)
      if (!cart)
        return res.status(404).json({ success: false, msg: "Cart not found" })
      return res.json({
        success: true,
        data: {
          cartDetails: cart,
        },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  //!-------------
}

export default CartController
