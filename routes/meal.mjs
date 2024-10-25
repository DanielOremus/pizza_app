import { Router } from "express"
import MealController from "../controllers/MealController.mjs"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import { checkSchema, validationResult } from "express-validator"
import MealValidator from "../middlewares/MealValidator.mjs"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}-${file.originalname}`
    cb(null, filename)
  },
})
const fileFilter = function (req, file, cb) {
  const validationErrors = validationResult(req) //Валідація даних
  console.log("-------------errors----------")

  console.log(validationErrors)

  if (!validationErrors.isEmpty()) {
    //Якщо є помилки, ігноруємо файл
    return cb(null, false)
  }
  cb(null, true) //Інакше, закидуємо в uploads
}

const upload = multer({ storage, fileFilter })

const router = Router()

router.get("/", MealController.getList)
router.get("/form/:id?", MealController.renderForm)

router.post(
  "/form/:id?",
  checkSchema(MealValidator.schema),
  upload.single("image"),
  MealController.updateMeal
)

router.delete("/", MealController.deleteMeal)

export default router
