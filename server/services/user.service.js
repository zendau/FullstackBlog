const userModel = require("../models/user.model")
const ApiError = require("../exceprions/api.error")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

const UserDto = require("../dtos/user.dto")
const TokenService = require("../services/token.service")
const ConfirmCodeService = require("../services/confirmCode.service")
const nodemailerService = require("./nodemailer.service")

class UserService {

  async registration(email, password) {

    await this.checkEmail(email)
    const hashPass = await this.getHashPassword(password)

    const user = await userModel.create({
      email,
      password: hashPass
    })

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    await ConfirmCodeService.createCode(userDto.id, userDto.email)

    return tokens
  }

  async login(email, password) {
    const user = await this.getByEmail(email)

    if (!user) {
      throw ApiError.HttpException("bad credentials")
    }

    const passwordEquals = await bcrypt.compare(password, user.password)

    if (!passwordEquals) {
      throw ApiError.HttpException("bad credentials")
    }

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return tokens
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await userModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return tokens
  }

  async getAllUsers() {
    const users = await userModel.find()

    const userDto = users.map(user => new UserDto(user))
    return userDto
  }

  async getById(id) {
    const user = await userModel.findById(id)

    if (user === null) {
      throw ApiError.HttpException(`Wrong user id. User id ${fileId} is not found`)
    }

    const userDto = new UserDto(user)

    return userDto
  }


  async logout(token) {

    if (!token) {
      throw ApiError.UnauthorizedError()
    }

    await TokenService.removeToken(token)
    return true
  }

  async setConfirmCode(email) {
    const user = await userModel.findOne({ email })

    if (!user) {
      throw ApiError.HttpException(`Not found user with email - ${email}`)
    }

    const res = await ConfirmCodeService.createCode(user)
    return res

  }

  async saveNewUserData(userId, code, newEmail, newPassword) {

    await ConfirmCodeService.checkCode(code)

    const user = await userModel.findById(userId)

    if (!user) {
      throw ApiError.HttpException(`Not found user with id - ${userId}`)
    } else {


      await this.checkEmail(email)

      const hashNewPass = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT))

      user.email = newEmail
      user.password = hashNewPass

      const userModel = await user.save()
      const userDto = new UserDto(userModel)

      await ConfirmCodeService.deleteCode(code)

      const tokens = TokenService.generateTokens(userDto)
      await TokenService.saveToken(userDto.id, tokens.refreshToken)

      return { ...tokens, userDto }
    }
  }

  async activateAccount(userId, confirmCode) {
    const userData = await this.getById(userId)

    await ConfirmCodeService.checkCode(confirmCode)


    await userModel.findByIdAndUpdate(userData.id,
      {
        isActivated: true
      }
    )
    await ConfirmCodeService.deleteCode(confirmCode)

    return true

  }

  async repeatConfirmCode(id) {
    const userData = await this.getById(id)

    await ConfirmCodeService.repeatCode(id, userData.email)
    return true
  }

  async getByEmail(email) {
    const userData = await userModel.findOne({ email })
    return userData
  }

  async checkEmail(email) {
    const candidate = await this.getByEmail(email)

    if (candidate) {
      throw ApiError.HttpException(`user with email - ${email} is already registered`)
    }

    return candidate
  }

  async getHashPassword(password) {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
  }

  async resetPassword(email, confirmCode) {

    const userData = await this.getByEmail(email)
    await ConfirmCodeService.checkCode(confirmCode)

    const newPaswword = uuid.v4()
    const hashPassword = await this.getHashPassword(newPaswword)

    userData.password = hashPassword
    await userData.save()

    nodemailerService.sendNewPassword(newPaswword, email)

    return `New password was send to ${email}`
  }

}

module.exports = new UserService()