import { Router } from "express"
import MealController from "../controllers/MealController.mjs"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import MealValidator from "../validators/MealValidator.mjs"
import ValidationController from "../controllers/ValidationController.mjs"
import { checkSchema } from "express-validator"
import ReviewValidator from "../validators/ReviewValidator.mjs"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}-${file.originalname}`
    cb(null, filename)
  },
})
const upload = multer({ storage })

const router = Router()

router.get("/", MealController.loadList)
router.get("/form/:id?", MealController.renderForm)
router.get("/:id", MealController.renderSpecific)

router.post(
  "/form/validate/:id?",
  checkSchema(MealValidator.schema),
  ValidationController.validateMealFields
)
router.post("/form/:id?", upload.single("image"), MealController.updateMeal)

router.post(
  "/:id/reviews/add",
  checkSchema(ReviewValidator.schema),
  MealController.addReview
)
router.delete("/", MealController.deleteMeal)

router.delete("/:id/reviews", MealController.deleteReview)

export default router
