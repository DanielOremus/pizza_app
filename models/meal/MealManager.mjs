import Meal from "./Meal.mjs"

class MealManager {
  static async loadList(searchParamsObj) {
    try {
      const res = await Meal.find(searchParamsObj || {})

      return res
    } catch (err) {
      return []
    }
  }
  static async getById(id) {
    try {
      return await Meal.findById(id).populate("category")
    } catch (err) {
      console.log(err)
    }
  }
  static async add(mealObj) {
    try {
      return await Meal.create(mealObj)
    } catch (err) {
      throw err
    }
  }
  static async update(id, newProps) {
    try {
      return await Meal.findByIdAndUpdate(id, newProps, {
        new: true,
        runValidators: true,
      })
    } catch (err) {
      throw err
    }
  }
  static async delete(id) {
    try {
      return await Meal.findByIdAndDelete(id)
    } catch (err) {
      console.log(err)
    }
  }
}

export default MealManager
