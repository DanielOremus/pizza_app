import DatabaseManager from "../utils/DatabaseManager.mjs"
import { v4 as uuidv4 } from "uuid"

class MealModel {
  static async loadList() {
    try {
      return await DatabaseManager.loadData()
    } catch (err) {
      throw err
    }
  }
  static async getById(id) {
    try {
      return await DatabaseManager.getItemById(id)
    } catch (err) {
      throw err
    }
  }
  static async add(mealObj) {
    try {
      await DatabaseManager.addItem({ id: uuidv4(), ...mealObj })
      return true
    } catch (err) {
      throw err
    }
  }
  static async update(id, newProps) {
    try {
      await DatabaseManager.updateItem(id, newProps)
      return true
    } catch (err) {
      throw err
    }
  }
  static async delete(id) {
    try {
      await DatabaseManager.deleteItem(id)
      return true
    } catch (err) {
      throw err
    }
  }
}

export default MealModel
