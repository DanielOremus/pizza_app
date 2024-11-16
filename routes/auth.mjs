import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"

const router = Router()

router.get("/login", AuthController.renderLogin)
router.get("/signup", AuthController.renderSignUp)
router.get("/logout", AuthController.logout)

router.post("/login", AuthController.login)
router.post("/signup", AuthController.signup)

export default router
