const UserService = require("../services/user.service")
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)
const ApiError = require("../exceprions/api.error")

class UserController {

  async registration(req, res, next) {
    try {
      debugger
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { email, password } = req.body
      const data = await UserService.registration(email, password)
      res.cookie("JWTRefreshToken", data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {

    try {
      const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6).max(20),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { email, password } = req.body
      const userData = await UserService.login(email, password)
      res.cookie('JWTRefreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { JWTRefreshToken } = req.cookies
      const userData = await UserService.refresh(JWTRefreshToken)
      res.cookie('JWTRefreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async allUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async logoutUser(req, res, next) {
    try {
      const { JWTRefreshToken } = req.cookies

      const resLogout = await UserService.logout(JWTRefreshToken)

      res.clearCookie("JWTRefreshToken")
      return res.json(resLogout)
    } catch (e) {
      next(e)
    }
  }

  async setConfirmCode(req, res, next) {
    try {
      const schema = Joi.object({ email: Joi.string().email().required() })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { email } = req.body
      await UserService.setConfirmCode(email)
      return res.send(true)
    } catch (e) {
      next(e)
    }
  }

  async saveNewUserData(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
        code: Joi.string().required(),
        newEmail: Joi.string().email(),
        newPassword: Joi.string().min(6).max(20),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId, code, newEmail, newPassword } = req.body
      const newUserData = await UserService.saveNewUserData(userId, code, newEmail, newPassword)
      res.cookie('JWTRefreshToken', newUserData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(newUserData)
    } catch (e) {
      next(e)
    }
  }

  async activateAccount(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
        confirmCode: Joi.string().required()
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId, confirmCode } = req.body
      const activateStatus = await UserService.activateAccount(userId, confirmCode)

      return res.json(activateStatus)
    } catch (e) {
      next(e)
    }
  }

  async repeatConfirmCode(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const userId = req.params.id
      const status = await UserService.repeatConfirmCode(userId)
      return res.json(status)

    } catch (e) {
      next(e)
    }
  }

  async resetPassword(req, res, next) {
    try {
      debugger
      const { confirmCode, email } = req.body
      const status = await UserService.resetPassword(email, confirmCode)

      return res.json(status)

    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserController()