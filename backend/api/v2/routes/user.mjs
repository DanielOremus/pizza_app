import UserController from "../controllers/UserController.mjs"
import { Router } from "express"
import {
  ensureAuthenticated,
  ensureAccountOwner,
} from "../../../middlewares/auth.mjs"

const router = Router()

router.get(
  "/:id",
  ensureAuthenticated,
  ensureAccountOwner,
  UserController.getSpecific
)

export default router
