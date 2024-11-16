export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({ success: false, msg: "Unauthorized" })
}
export function ensureManager(req, res, next) {
  if (req.isAuthenticated() && req.user.role.title === "Manager") return next()
  res.status(403).json({ success: false, msg: "Forbidden" })
}

// export function ensureOwner(req,res,next){
//   if(req.isAuthenticated() && req.user.id===req.body.accountId)
// }
