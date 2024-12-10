import Role from "./Role.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class RoleManager extends MongooseCRUDManager {
  async getList(
    filters = {},
    projection = {},
    options = {},
    populateFields = []
  ) {
    try {
      return await super.getList(filters, projection, options, populateFields)
    } catch (error) {
      return []
    }
  }
  async getById(id, projection = {}, populateFields = []) {
    try {
      return await super.getById(id, projection, populateFields)
    } catch (error) {
      throw error
    }
  }
  async getOne(filters, projection = {}, populateFields = []) {
    try {
      return await super.getOne(filters, projection, populateFields)
    } catch (error) {
      throw error
    }
  }
}

export default new RoleManager(Role)
