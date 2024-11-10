import User from "./User.mjs"

class UserManager {
  static async getList() {
    try {
      return await User.find()
    } catch (error) {
      return []
    }
  }
  static async getById(id) {
    try {
      return await User.findById(id)
    } catch (error) {
      throw error
    }
  }
  static async create(criticProps) {
    try {
      return await User.create(criticProps)
    } catch (error) {
      throw error
    }
  }
  static async updateById(id, newProps) {
    try {
      return await User.findByIdAndUpdate(id, newProps, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw error
    }
  }
  static async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }
}

export default UserManager
