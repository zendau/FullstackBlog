import { Router } from "express"

import CommentController from "../controllers/comment.controller.js"
import { userGuard } from "../middlewares/auth.middleware.js"

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The Comment API
 */

/**
 * @swagger
 * /comment/add:
 *   post:
 *     summary: add comment to post
 *     tags: [Comment]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: postId
 *         name: postId
 *         schema:
 *          type: objectId
 *         description: objectId of post
 *       - in: message
 *         name: message
 *         schema:
 *          type: string
 *         description: post's message
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/Comment'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/add", userGuard, CommentController.create)

/**
 * @swagger
 * /comment/edit:
 *   put:
 *     summary: add comment to post
 *     tags: [Comment]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: commentId
 *         name: commentId
 *         schema:
 *          type: objectId
 *         description: objectId of post
 *       - in: message
 *         name: message
 *         schema:
 *          type: string
 *         description: post's new message
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/Comment'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.put("/edit", userGuard, CommentController.edit)

/**
 * @swagger
 * /comment/delete:
 *   delete:
 *     summary: delete post's comment
 *     tags: [Comment]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: commentId
 *         name: commentId
 *         schema:
 *          type: objectId
 *         description: objectId of post
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *              type: boolean
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.delete("/delete", userGuard, CommentController.delete)

export default router
