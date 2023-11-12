const Router = require("express").Router;
const PostController = require("../controllers/post.controller");
const router = new Router();

const { authGuard } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /comment/add:
 *   post:
 *     summary: add comment to post
 *     tags: [Post]
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

router.post("/add", authGuard, PostController.addPostComment);

/**
 * @swagger
 * /comment/edit:
 *   put:
 *     summary: add comment to post
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: commentId
 *         name: commentId
 *         schema:
 *          type: objectId
 *         description: objectId of post
 *       - in: newMessage
 *         name: newMessage
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

router.put("/edit", authGuard, PostController.editPostComment);

/**
 * @swagger
 * /comment/delete:
 *   delete:
 *     summary: delete post's comment
 *     tags: [Post]
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
 *              type: string
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.delete(
  "/delete",
  authGuard,
  PostController.deletePostComment
);

module.exports = router;
