import { Router } from "express"
import MainController from "../controllers/MainController.mjs"

const router = Router()
router.get("/", MainController.renderHomePage)
router.get("/about", MainController.renderAboutPage)

export default router
