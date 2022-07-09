const Router = require('express').Router
const FileController = require('../controllers/file.controller')
const router = new Router()

const authMiddleware = require("../middlewares/auth.middleware")

const multer = require('../middlewares/multer.middleware')

router.post("/add", multer, FileController.add)
router.get("/get/:id", FileController.getOne)
router.get("/list", FileController.getList)
router.put("/update/:id", multer, FileController.update)
router.delete("/delete/:id", FileController.delete)
router.get("/download/:id", FileController.download)

module.exports = router