import { Router } from "express"

import UserController from "../controllers/user.controller.js"
import { userGuard } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import {
  activateAccountScheme,
  getUserByIdScheme,
  loginSchema,
  paginationScheme,
  registrationSchema,
  saveNewUserDataSchema,
  sendConfirmCodeSchema,
} from "../validations/user.validation.js"

const router = new Router()

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

router.post(
  "/register",
  validate(registrationSchema),
  UserController.registration,
)

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

router.post("/login", validate(loginSchema), UserController.login)

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

router.post("/refresh", UserController.refresh)

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
 * /user/resendConfirmCode:
 *   get:
 *     summary: Resend confirm code
 *     tags: [User]
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

router.post(
  "/sendConfirmCode",
  validate(sendConfirmCodeSchema),
  UserController.sendConfirmCode,
)

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

router.put(
  "/saveNewData",
  validate(saveNewUserDataSchema),
  userGuard,
  UserController.saveNewUserData,
)

/**
 * @swagger
 * /user/activate:
 *   post:
 *     summary: User activate
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
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

router.post(
  "/activate",
  userGuard,
  validate(activateAccountScheme),
  UserController.activateAccount,
)

/**
 * @swagger
 * /user/resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [User]
 *     parameters:
 *       - in: email
 *         name: email
 *         type: string
 *         description: email of User
 *       - in: confirmCode
 *         name: confirmCode
 *         type: string
 *         description: confirmCode
 *     responses:
 *       200:
 *         description: New password was send to email
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/resetPassword", UserController.resetPassword)

/**
 * @swagger
 * /user/data/:
 *   get:
 *     summary: Get user post data
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: id
 *         name: id
 *         type: ObjectId
 *         description: ObjectId of User
 *     responses:
 *       200:
 *         description: User post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/postData'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get(
  "/data/:id",
  validate(getUserByIdScheme, "params"),
  UserController.getUserById,
)

router.get(
  "/pagination",
  validate(paginationScheme, "query"),
  UserController.getPaginationList,
)

export default router
