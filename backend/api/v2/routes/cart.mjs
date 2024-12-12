import CartController from "../controllers/CartController.mjs"
import { Router } from "express"
import { ensureAuthenticated } from "../../../middlewares/auth.mjs"
import { checkSchema } from "express-validator"

const router = Router()

router.use(ensureAuthenticated)

router.get("/", CartController.getByUserId)

//Add validator
router.post("/add-meal", CartController.addMealToCart)
router.put("/update-meal-amount", CartController.updateMealAmount)

router.delete("/delete-meal", CartController.deleteMealFromCart)

export default router
