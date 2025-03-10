import Logger from "../libs/logger.js"
import UserService from "../services/user.service.js"

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await UserService.registration(email, password)
      res.cookie("JWTRefreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      Logger.info(`User '${email}' was registered`)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.login(email, password)
      res.cookie("JWTRefreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { JWTRefreshToken } = req.cookies
      const userData = await UserService.refresh(JWTRefreshToken)
      res.cookie("JWTRefreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
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

  async sendConfirmCode(req, res, next) {
    try {
      const { email } = req.body
      await UserService.setConfirmCode(email)
      return res.send(true)
    } catch (e) {
      next(e)
    }
  }

  async saveNewUserData(req, res, next) {
    try {
      const { code, newEmail, newPassword } = req.body
      const userId = req.user.payload.id
      const newUserData = await UserService.saveNewUserData(
        userId,
        code,
        newEmail,
        newPassword,
      )
      res.cookie("JWTRefreshToken", newUserData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(newUserData)
    } catch (e) {
      next(e)
    }
  }

  async activateAccount(req, res, next) {
    try {
      const { confirmCode } = req.body
      const { id } = req.user.payload
      const activateStatus = await UserService.activateAccount(id, confirmCode)

      return res.json(activateStatus)
    } catch (e) {
      next(e)
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { confirmCode, email } = req.body
      const status = await UserService.resetPassword(email, confirmCode)

      return res.json(status)
    } catch (e) {
      next(e)
    }
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.id
      const status = await UserService.getUserData(userId)

      return res.json(status)
    } catch (e) {
      next(e)
    }
  }

  async getPaginationList(req, res, next) {
    try {
      const { limit, page, exclude, substring } = req.query

      const skipValue = (page ?? 0) * limit

      const skip = Number.isNaN(skipValue) ? 0 : skipValue

      const limitValue = limit ? parseInt(limit) : 1

      const data = await UserService.getPaginationList(
        exclude,
        limitValue,
        skip,
        {
          substring,
        },
      )

      res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
