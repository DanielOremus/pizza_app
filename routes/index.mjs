import { Router } from "express"
import mainRoutes from "./mainRoutes.mjs"
import mealsRouter from "./meal.mjs"
import authRouter from "./auth.mjs"

const router = Router()

router.use("/", mainRoutes)
router.use("/menu", mealsRouter)
router.use("/auth", authRouter)

export default router
