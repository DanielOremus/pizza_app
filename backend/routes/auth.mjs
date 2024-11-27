import { Router } from "express"
import AuthController from "../controllers/AuthController.mjs"
import AuthValidator from "../validators/AuthValidator.mjs"
import {
  ensureAuthenticated,
  ensureNotAuthenticated,
} from "../middlewares/auth.mjs"
import { checkSchema } from "express-validator"

const router = Router()

router.get("/login", ensureNotAuthenticated, AuthController.renderLogin)
router.get("/signup", ensureNotAuthenticated, AuthController.renderSignUp)
router.get("/logout", ensureAuthenticated, AuthController.logout)

router.post(
  "/login",
  ensureNotAuthenticated,
  checkSchema(AuthValidator.loginSchema),
  AuthController.login
)
router.post(
  "/signup",
  ensureNotAuthenticated,
  checkSchema(AuthValidator.signupSchema),
  AuthController.signup
)

export default router
