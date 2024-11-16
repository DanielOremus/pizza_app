import { Router } from "express"
import MealController from "../controllers/MealController.mjs"
import MealValidator from "../validators/MealValidator.mjs"
import ValidationController from "../controllers/ValidationController.mjs"
import { checkSchema } from "express-validator"
import ReviewValidator from "../validators/ReviewValidator.mjs"
import upload from "../config/multer.mjs"
import { ensureAuthenticated, ensureManager } from "../middlewares/auth.mjs"

const router = Router()

router.get("/", MealController.loadList)
router.get(
  "/form/:id?",
  ensureAuthenticated,
  ensureManager,
  MealController.renderForm
)
router.get("/:id", MealController.renderSpecific)

router.post(
  "/form/validate/:id?",
  checkSchema(MealValidator.schema),
  ValidationController.validateMealFields
)
router.post(
  "/form/:id?",
  upload.single("image"),
  ensureAuthenticated,
  ensureManager,
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
  ensureAuthenticated,
  ensureManager,
  MealController.deleteMeal
)

router.delete("/:id/reviews", ensureAuthenticated, MealController.deleteReview)

export default router
