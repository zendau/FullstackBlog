import { Router } from "express"

import AdminController from "../controllers/admin.controller.js"
import UserController from "../controllers/user.controller.js"
import { authGuard } from "../middlewares/auth.middleware.js"

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

router.get("/all", authGuard, UserController.userList)

router.patch("/roles", AdminController.getRoles)
router.patch("/setRole", AdminController.setUserRole)
router.patch("/unSetRole", AdminController.unSetUserRole)
router.patch("/block", AdminController.blockUser)
router.patch("/unBlock", AdminController.unBlockUser)

export default router
