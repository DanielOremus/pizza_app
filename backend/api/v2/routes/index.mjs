import { Router } from "express"
import mealsRouter from "./meal.mjs"
import authRouter from "./auth.mjs"
import categoryRouter from "./category.mjs"
import userRouter from "./user.mjs"
import cartRouter from "./cart.mjs"

const router = Router()

router.use("/menu", mealsRouter)
router.use("/auth", authRouter)
router.use("/categories", categoryRouter)
router.use("/users", userRouter)
router.use("/cart", cartRouter)

export default router
