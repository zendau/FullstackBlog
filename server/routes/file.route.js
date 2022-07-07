const Router = require('express').Router
const FileController = require('../controllers/file.controller')
const router = new Router()

const authMiddleware = require("../middlewares/auth.middleware")

const multer = require('../middlewares/multer.middleware')

// router.get("/download", FileController.download)

router.post("/add", multer, FileController.add)
router.get("/get/:id", FileController.getOne)
router.get("/list", FileController.getList)
router.put("/update/:id", multer, FileController.update)
router.delete("/delete/:id", FileController.delete)


module.exports = router