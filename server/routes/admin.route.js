const Router = require("express").Router
const UserController = require("../controllers/user.controller")
const AdminController = require("../controllers/admin.controller")
const router = new Router()

const { authGuard } = require("../middlewares/auth.middleware")

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

router.get("/roles", AdminController.getRoles)

module.exports = router
