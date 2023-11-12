const Router = require("express").Router
const FileController = require("../controllers/file.controller")
const router = new Router()

const { authGuard } = require("../middlewares/auth.middleware")

const multer = require("../middlewares/multer.middleware")

/**
 * @swagger
 * tags:
 *   name: File
 *   description: The file API
 */

/**
 * @swagger
 * /file/add:
 *   post:
 *     summary: Create a new book
 *     tags: [File]
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     responses:
 *       200:
 *         description: File was uploaded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/File'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.post("/add", authGuard, multer, FileController.add)

/**
 * @swagger
 * /file/get/{id}:
 *   get:
 *     summary: Get file by id
 *     tags: [File]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: id
 *         name: id
 *         schema:
 *          type: string
 *         description: Get file by id.
 *     responses:
 *       200:
 *         description: File data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/DTOs/File'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */
router.get("/get/:id", authGuard, FileController.getOne)

/**
 * @swagger
 * /file/list:
 *   get:
 *     summary: Get all files
 *     tags: [File]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of files data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/DTOs/File'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/list", authGuard, FileController.getList)

/**
 * @swagger
 * /file/update/{id}:
 *   put:
 *     summary: Update file data by id
 *     tags: [File]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: id
 *        name: id
 *     responses:
 *       200:
 *         description: file data
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/DTOs/File'
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.put("/update/:id", authGuard, multer, FileController.update)

/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Delete file data by id
 *     tags: [File]
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

router.delete("/delete/:id", authGuard, FileController.delete)

/**
 * @swagger
 * /file/download:
 *   get:
 *     summary: Download file
 *     tags: [File]
 *     responses:
 *       200:
 *         description: Download file by name
 *       400:
 *          description: Error message
 *       401:
 *         description: User is not auth
 *       500:
 *         description: Unexpected error
 */

router.get("/download/:id", FileController.download)

module.exports = router
