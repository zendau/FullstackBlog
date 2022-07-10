const Router = require('express').Router
const UserController = require('../controllers/user.controller')
const router = new Router()

const authMiddleware = require("../middlewares/auth.middleware")
const isActivateMiddleware = require("../middlewares/isActivate.middleware")

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User API
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: User registration
 *     tags: [User]
 *     parameters:
 *       - in: email
 *         name: email
 *         type: string
 *         description: User email
 *       - in: password
 *         name: password
 *         type: string
 *         description: User password
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Token'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/register", UserController.registration)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     parameters:
 *       - in: email
 *         name: email
 *         type: string
 *         description: User email
 *       - in: password
 *         name: password
 *         type: string
 *         description: User password
 *     responses:
 *       200:
 *         description: User login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Token'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/login", UserController.login)

/**
 * @swagger
 * /user/refresh:
 *   get:
 *     summary: User refresh token
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: User JWT data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Token'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/refresh", UserController.refresh)

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

router.get("/all", authMiddleware, isActivateMiddleware, UserController.allUsers)

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: logout user
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logout
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/logout", UserController.logoutUser)

/**
 * @swagger
 * /user/setConfirmCode:
 *   post:
 *     summary: Set confirm code
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: userId
 *         name: userId
 *         type: ObjectId
 *         description: ObjectId of User
 *     responses:
 *       200:
 *         description: confirm code successfully created
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/setConfirmCode", UserController.setConfirmCode)

/**
 * @swagger
 * /user/saveNewData:
 *   put:
 *     summary: User registration
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: userId
 *         name: userId
 *         type: ObjectId
 *         description: ObjectId of User
 *       - in: code
 *         name: code
 *         type: string
 *         description: Cofirm code
 *       - in: newEmail
 *         name: newEmail
 *         type: string
 *         description: New user email
 *       - in: newPassword
 *         name: newPassword
 *         type: string
 *         description: New user password
 *     responses:
 *       200:
 *         description: User data updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Token'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.put("/saveNewData", UserController.saveNewUserData)

/**
 * @swagger
 * /user/activate:
 *   post:
 *     summary: User activate
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: userId
 *         name: userId
 *         type: ObjectId
 *         description: ObjectId of User
 *       - in: code
 *         name: code
 *         type: string
 *         description: Cofirm code
 *     responses:
 *       200:
 *         description: User account activated
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post('/activate', UserController.activateAccount)

/**
 * @swagger
 * /user/getActivateCode:
 *   get:
 *     summary: User re-send confirm code
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: userId
 *         name: userId
 *         type: ObjectId
 *         description: ObjectId of User
 *     responses:
 *       200:
 *         description: Confirm code was re-send 
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get('/getActivateCode/:id', UserController.repeatConfirmCode)

module.exports = router