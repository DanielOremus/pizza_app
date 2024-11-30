import { Router } from "express"
import mealsRouter from "./meal.mjs"
import authRouter from "./auth.mjs"
import categoryRouter from "./category.mjs"

const router = Router()

router.use("/menu", mealsRouter)
router.use("/auth", authRouter)
router.use("/categories", categoryRouter)

export default router
