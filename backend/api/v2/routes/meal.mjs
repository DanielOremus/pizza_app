import { Router } from "express"
import MealController from "../controllers/MealController.mjs"
import MealValidator from "../validators/MealValidator.mjs"
import { checkSchema } from "express-validator"
import ReviewValidator from "../validators/ReviewValidator.mjs"
import upload from "../../../middlewares/multer.mjs"
import {
  ensureAuthenticated,
  ensureManager,
  ensureAccountOwner,
} from "../../../middlewares/auth.mjs"

const router = Router()

router.get("/", MealController.getList)

router.get("/:id", MealController.getSpecific)

router.post(
  "/form/:id?",
  upload.single("image"),
  // ensureAuthenticated,
  // ensureManager,
  checkSchema(MealValidator.schema),
  MealController.updateMeal
)

router.post(
  "/:id/reviews/add",
  ensureAuthenticated,
  checkSchema(ReviewValidator.schema),
  MealController.addReview
)
router.delete(
  "/",
  // ensureAuthenticated,
  // ensureManager,
  MealController.deleteMeal
)

router.delete(
  "/:id/reviews",
  ensureAuthenticated,
  ensureAccountOwner,
  MealController.deleteReview
)

export default router
