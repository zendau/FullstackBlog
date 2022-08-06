const userModel = require("../models/user.model")
const ApiError = require("../exceprions/api.error")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

const TokenService = require("../services/token.service")
const ConfirmCodeService = require("../services/confirmCode.service")
const nodemailerService = require("./nodemailer.service")
const PostService = require('../services/post.service')

const UserDTO = require("../dtos/user.dto")
const PostDataDTO = require('../dtos/postData.dto')

class UserService {

  async registration(email, password) {

    await this.checkEmail(email)
    const hashPass = await this.getHashPassword(password)

    const user = await userModel.create({
      email,
      password: hashPass
    })

    debugger
    const userDTO = new UserDTO(user)

    const tokens = TokenService.generateTokens(userDTO)
    await TokenService.saveToken(userDTO.id, tokens.refreshToken)
    await ConfirmCodeService.createCode(userDTO)

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

    const userDTO = new UserDTO(user)

    const tokens = TokenService.generateTokens(userDTO)
    await TokenService.saveToken(userDTO.id, tokens.refreshToken)

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
    const userDTO = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDTO })

    await TokenService.saveToken(userDTO.id, tokens.refreshToken)
    return tokens
  }

  async getUsersList() {
    const users = await userModel.find()

    const userDTO = users.map(user => new UserDTO(user))
    return userDTO
  }

  async getById(id) {
    const user = await userModel.findById(id)

    if (user === null) {
      throw ApiError.HttpException(`User id ${fileId} is not found`)
    }

    const userDTO = new UserDTO(user)

    return userDTO
  }

  async getUserData(id) {
    const user = await this.getById(id)

    const postData = await PostService.getUserPostData(id)
    user.rating = postData.userRating 
    user.comments = postData.comments 
    user.reactions = postData.reactions
    return new PostDataDTO(user)
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
    debugger
    await ConfirmCodeService.checkCode(code)

    const user = await userModel.findById(userId)

    if (!user) {
      throw ApiError.HttpException(`Not found user with id - ${userId}`)
    }

    if (newEmail) {
      await this.checkEmail(newEmail)
      user.email = newEmail
    }

    if (newPassword) {
      const hashNewPass = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT))
      user.password = hashNewPass
    }

    const updatedUserModel = await user.save()
    const userDTO = new UserDTO(updatedUserModel)

    await ConfirmCodeService.deleteCode(code)

    const tokens = TokenService.generateTokens(userDTO)
    await TokenService.saveToken(userDTO.id, tokens.refreshToken)

    return tokens
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
    return { message: `Confirm code was resend is your email` }
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

    return { message: `New password was send to ${email}` } 
  }

}

module.exports = new UserService()