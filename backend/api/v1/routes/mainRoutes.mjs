import { Router } from "express"

const router = Router()
router.get("/", MainController.renderHomePage)
router.get("/about", MainController.renderAboutPage)

export default router
