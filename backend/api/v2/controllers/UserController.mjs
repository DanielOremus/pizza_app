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
  static async getSpecific(req, res) {
    const id = req.params.id
    const isShort = req.body.isShort || true
    const projection = isShort
      ? { fullName: 1, firstName: 1, lastName: 1, permissions: 1, role: 1 }
      : { password: 0 }
    const populateFields = isShort
      ? [
          {
            fieldForPopulation: "role",
            requiredFieldsFromTargetObj: "permissions",
          },
        ]
      : ["role"]
    try {
      const user = await UserManager.getById(id, projection, populateFields)
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" })
      }
      return res.json({
        success: true,
        data: { user },
      })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default UserController
