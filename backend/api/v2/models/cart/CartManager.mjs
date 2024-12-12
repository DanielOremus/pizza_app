import Cart from "./Cart.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class CartManager extends MongooseCRUDManager {
  async getDetails(userId) {
    try {
      const cart = await Cart.findOne({ customer: userId }).populate({
        path: "mealsList.meal",
        populate: {
          path: "category",
        },
      })
      return cart
    } catch (error) {
      throw error
    }
  }

  async addMeal(userId, mealId) {
    try {
      let cart = await Cart.findOne({ customer: userId })
      if (!cart) {
        cart = await super.create({
          customer: userId,
          mealsList: [{ meal: mealId, amount: 1 }],
        })
      } else {
        const mealIndex = cart.mealsList.findIndex((obj) =>
          obj.meal.equals(mealId)
        )
        if (mealIndex > -1) {
          cart.mealsList[mealIndex].amount += 1
        } else {
          cart.mealsList.push({ meal: mealId, amount: 1 })
        }
        cart = await cart.save()
      }
      await cart.populate({
        path: "mealsList.meal",
        populate: {
          path: "category",
        },
      })
      return cart
    } catch (error) {
      throw error
    }
  }
  async updateMealAmount(userId, mealId, amount) {
    try {
      console.log(mealId)

      return await Cart.findOneAndUpdate(
        { customer: userId, "mealsList.meal": mealId },
        {
          $set: {
            "mealsList.$.amount": amount,
          },
        },
        { runValidators: true, new: true }
      )
    } catch (error) {
      throw error
    }
  }
  async deleteMeal(userId, mealId) {
    try {
      return await Cart.findOneAndUpdate(
        { customer: userId },
        {
          $pull: { mealsList: { meal: mealId } },
        },
        {
          new: true,
        }
      )
    } catch (error) {
      throw error
    }
  }
  async deleteCartByUserId(userId) {
    try {
      return await super.deleteOne({ customer: userId })
    } catch (error) {
      throw error
    }
  }
}

export default new CartManager(Cart)
