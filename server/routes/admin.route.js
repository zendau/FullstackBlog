import { Router } from "express"

import AdminController from "../controllers/admin.controller.js"
import { adminGuard } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import {
  blockSchema,
  setRolesSchema,
  unBlockSchema,
} from "../validations/admin.validation.js"

const router = new Router()

router.patch("/roles", adminGuard, AdminController.getRoles)
router.patch(
  "/setRoles",
  adminGuard,
  validate(setRolesSchema),
  AdminController.setUserRoles,
)

router.patch(
  "/block",
  adminGuard,
  validate(blockSchema),
  AdminController.blockUser,
)
router.patch(
  "/unBlock",
  adminGuard,
  validate(unBlockSchema),
  AdminController.unBlockUser,
)

export default router
