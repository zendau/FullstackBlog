import { Router } from "express"

import AdminController from "../controllers/admin.controller.js"
import { adminGuard } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import {
  blockSchema,
  setRoleSchema,
  unBlockSchema,
  unSetRoleSchema,
} from "../validations/admin.validation.js"

const router = new Router()

router.patch("/roles", adminGuard, AdminController.getRoles)
router.patch(
  "/setRole",
  adminGuard,
  validate(setRoleSchema),
  AdminController.setUserRole,
)
router.patch(
  "/unSetRole",
  adminGuard,
  validate(unSetRoleSchema),
  AdminController.unSetUserRole,
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
