import { Router } from "express"
import MealController from "../controllers/MealController.mjs"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import MealValidator from "../middlewares/MealValidator.mjs"
import ValidationController from "../controllers/ValidationController.mjs"
import { checkSchema } from "express-validator"

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

router.get("/", MealController.getList)
router.get("/form/:id?", MealController.renderForm)

router.post(
  "/form/validate/:id?",
  checkSchema(MealValidator.schema),
  ValidationController.validateMealFields
)
router.post("/form/:id?", upload.single("image"), MealController.updateMeal)

router.delete("/", MealController.deleteMeal)

export default router
