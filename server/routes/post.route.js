const Router = require("express").Router
const PostController = require("../controllers/post.controller")
const router = new Router()

const {
  authGuard,
  adminGuard,
  noAuth,
} = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer.middleware")

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

router.post("/create", adminGuard, multer, PostController.create)

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

router.patch("/edit", authGuard, multer, PostController.edit)

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

router.delete("/delete/:id", authGuard, PostController.delete)

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

router.get("/get/:id", noAuth, PostController.getOne)

router.get("/search/:substring", PostController.getPostsBySubString)

/**
 * @swagger
 * /post/getUserPosts:
 *   get:
 *     summary: Get all post by selected user
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: UserId
 *         name: UserId
 *         schema:
 *          type: ObjectId
 *         description: User id.
 *       - in: Limit
 *         name: Limit
 *         schema:
 *          type: number
 *         description: Post on page.
 *       - in: currentPage
 *         name: currentPage
 *         schema:
 *          type: number
 *         description: Current page
 *     responses:
 *       200:
 *         description: Post data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/getUserPosts/", PostController.getUserPosts)

/**
 * @swagger
 * /post/list:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/getAllPosts", PostController.getAllPosts)

/**
 * @swagger
 * /post/getLimitPosts:
 *   get:
 *     summary: Get post with pagination
 *     tags: [Post]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: Limit
 *         name: Limit
 *         schema:
 *          type: number
 *         description: Post on page.
 *       - in: currentPage
 *         name: currentPage
 *         schema:
 *          type: number
 *         description: Current page
 *     responses:
 *       200:
 *         description: Posts data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/Post'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/getLimitPosts", PostController.getLimitPosts)

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

router.patch("/reacting", authGuard, PostController.reactionPost)

module.exports = router
