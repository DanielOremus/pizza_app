import passport from "../config/passport.mjs"
import RoleManager from "../api/v2/models/role/RoleManager.mjs"
export function ensureAuthenticated(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user)
      return res.status(401).json({ success: false, msg: "Unauthorized" })
    req.user = user
    next()
  })(req, res, next)
}
export async function ensureManager(req, res, next) {
  try {
    const managerRole = await RoleManager.getOne({ title: "Manager" })
    if (!managerRole) {
      return res.status(500).json({
        success: false,
        msg: "Role not found",
      })
    }
    console.log(req.user)

    if (managerRole._id.equals(req.user?.role)) return next()
    res.status(403).json({ success: false, msg: "Forbidden" })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

export function ensureAccountOwner(req, res, next) {
  if (req.user?.id === req.params.id) return next()
  res.status(403).json({ success: false, msg: "Forbidden" })
}

export function ensureNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) return next()
  res.redirect("/")
}
