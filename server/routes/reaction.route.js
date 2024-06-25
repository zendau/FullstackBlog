import { Router } from "express"

import ReactionController from "../controllers/reaction.controller.js"
import { userGuard } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import {
  reactSchema,
  reactStatusSchema,
} from "../validations/reaction.validation.js"

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Reaction
 *   description: The Reaction API
 */

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
  "/set",
  userGuard,
  validate(reactSchema, "query"),
  ReactionController.setReaction,
)

router.get(
  "/status",
  userGuard,
  validate(reactStatusSchema, "query"),
  ReactionController.getReactionStatus,
)

export default router
