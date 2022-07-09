const Router = require('express').Router
const UserController = require('../controllers/user.controller')
const router = new Router()

const authMiddleware = require("../middlewares/auth.middleware")

router.post("/registration", UserController.registration)
router.post("/login", UserController.login)
router.get("/refresh", UserController.refresh)
router.get("/all", authMiddleware, UserController.allUsers)
router.get("/logout", UserController.logoutUser)

router.post("/setConfirmCode", UserController.setConfirmCode)
router.put("/saveNewData", UserController.saveNewUserData)

router.post('/activate', UserController.activateAccount)
router.get('/getActivateCode/:id', UserController.repeatConfirmCode)

// repeat send code

module.exports = router