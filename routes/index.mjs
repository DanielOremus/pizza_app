import { Router } from "express"
import mainRoutes from "./mainRoutes.mjs"
import mealsRouter from "./meal.mjs"

const router = Router()

router.use("/", mainRoutes)
router.use("/menu", mealsRouter)

export default router
