import { Router } from "express"

import AdminController from "../controllers/admin.controller.js"
import UserController from "../controllers/user.controller.js"
import { adminGuard } from "../middlewares/auth.middleware.js"

const router = new Router()

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/User'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/all", adminGuard, UserController.userList)

router.patch("/roles", adminGuard, AdminController.getRoles)
router.patch("/setRole", adminGuard, AdminController.setUserRole)
router.patch("/unSetRole", adminGuard, AdminController.unSetUserRole)
router.patch("/block", adminGuard, AdminController.blockUser)
router.patch("/unBlock", adminGuard, AdminController.unBlockUser)

export default router
