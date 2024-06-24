import { Router } from "express"

import AdminController from "../controllers/admin.controller.js"
import { adminGuard } from "../middlewares/auth.middleware.js"

const router = new Router()

router.patch("/roles", adminGuard, AdminController.getRoles)
router.patch("/setRole", adminGuard, AdminController.setUserRole)
router.patch("/unSetRole", adminGuard, AdminController.unSetUserRole)
router.patch("/block", adminGuard, AdminController.blockUser)
router.patch("/unBlock", adminGuard, AdminController.unBlockUser)

export default router
