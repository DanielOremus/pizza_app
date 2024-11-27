import UserManager from "../models/user/UserManager.mjs"

class UserController {
  static async loadList(req, res) {
    try {
      const list = UserManager.getList()
      res.json({ success: true, data: list })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async add(req, res) {
    try {
      const { firstName, lastName, jobStartDate } = req.body
      const user = await UserManager.create({
        firstName,
        lastName,
        jobStartDate,
      })
      res.json({ success: true, data: user })
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message })
    }
  }
  static async delete(req, res) {
    try {
      const id = req.body.id
      if (!id)
        return res
          .status(400)
          .json({ success: false, msg: "ID is not provided" })

      const user = await UserManager.deleteById(id)
      if (!user)
        return res.status(404).json({ success: false, msg: "User not found" })

      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default UserController
