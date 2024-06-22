import { Router } from "express"

import PostController from "../controllers/post.controller.js"
import { userGuard } from "../middlewares/auth.middleware.js"
import { fileUpload } from "../middlewares/multer.middleware.js"
import validate from "../middlewares/validate.middleware"
import {
  createSchema,
  deleteSchema,
  editSchema,
  getOneSchema,
  paginationScheme,
  reactSchema,
  reactStatusSchema,
} from "../validations/post.validation.js"

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post API
 */

/**
 * @swagger
 * /post/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post's created data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post(
  "/create",
  userGuard,
  validate(createSchema),
  fileUpload,
  PostController.create,
)

/**
 * @swagger
 * /post/edit:
 *   patch:
 *     summary: Update post's data
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post's updated data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.patch(
  "/edit",
  userGuard,
  validate(editSchema),
  fileUpload,
  PostController.edit,
)

/**
 * @swagger
 * /post/delete/{id}:
 *   delete:
 *     summary: Delete post by id
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: id
 *        name: id
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.delete(
  "/delete/:id",
  userGuard,
  validate(deleteSchema, "params"),
  PostController.delete,
)

/**
 * @swagger
 * /post/get/{id}:
 *   get:
 *     summary: Get post by id
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: postId
 *         name: postId
 *         schema:
 *          type: string
 *         description: Get Post by id.
 *       - in: userId
 *         name: userId
 *         schema:
 *          type: string
 *          description: UserId for get likes.
 *     responses:
 *       200:
 *         description: Post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/get/:id", validate(getOneSchema, "params"), PostController.getOne)

/**
 * @swagger
 * /post/reacting:
 *   patch:
 *     summary: Set reaction on post
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: postId
 *         name: postId
 *         schema:
 *          type: objectId
 *         description: objectId of post
 *       - in: isLiked
 *         name: isLiked
 *         schema:
 *          type: boolean
 *         description: boolean reaction on post
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.patch(
  "/reacting",
  userGuard,
  validate(reactSchema, "query"),
  PostController.reactionPost,
)

router.get(
  "/pagination",
  validate(paginationScheme, "query"),
  PostController.getPostsPagination,
)
router.get(
  "/reaction",
  userGuard,
  validate(reactStatusSchema, "query"),
  PostController.getPostReactionStatus,
)

export default router
