import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import {
  ensureAuthenticated,
  ensureNotAuthenticated,
} from "../middlewares/auth.mjs"

const router = Router()

router.get("/login", ensureNotAuthenticated, AuthController.renderLogin)
router.get("/signup", ensureNotAuthenticated, AuthController.renderSignUp)
router.get("/logout", ensureAuthenticated, AuthController.logout)

router.post("/login", ensureNotAuthenticated, AuthController.login)
router.post("/signup", ensureNotAuthenticated, AuthController.signup)

export default router
