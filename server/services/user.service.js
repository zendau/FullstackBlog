import bcrypt from "bcrypt"

import {
  extended,
  facetData,
  idFilter,
  listFilter,
} from "../aggregation/user.builder.js"
import { ERROR_USER } from "../constants/error.messages.js"
import { RESPONSE_MESSAGE } from "../constants/mail.messages.js"
import UserDTO from "../dtos/user.dto.js"
import ApiError from "../exceptions/api.error.js"
import Logger from "../libs/logger.js"
import UserRepository from "../repositories/user.repository.js"
import ConfirmCodeService from "./confirmCode.service.js"
import nodemailerService from "./nodemailer.service.js"
import TokenService from "./token.service.js"

class UserService {
  async registration(email, password) {
    await this.checkEmailExists(email)
    const hashPass = await this.getHashPassword(password)

    const user = await UserRepository.create({
      email,
      password: hashPass,
    })

    const userDTO = new UserDTO(user)

    const tokens = TokenService.generateTokens(userDTO)
    await TokenService.saveToken(userDTO.id, tokens.refreshToken)
    await ConfirmCodeService.createCode(userDTO)

    return tokens
  }

  async login(email, password) {
    const user = await this.getByEmail(email)

    if (!user) {
      throw ApiError.HttpException(ERROR_USER.BAD_CREDENTIALS)
    }

    const passwordEquals = await bcrypt.compare(password, user.password)

    if (!passwordEquals) {
      throw ApiError.HttpException(ERROR_USER.BAD_CREDENTIALS)
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
    const user = await UserRepository.findById(userData.id)
    const userDTO = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDTO })
    Logger.info(`Update token to ${userDTO.email}`)

    await TokenService.saveToken(userDTO.id, tokens.refreshToken)
    return tokens
  }

  async getById(id) {
    const user = await UserRepository.findById(id)

    if (user === null) {
      throw ApiError.HttpException(ERROR_USER.NOT_FOUND_BY_ID)
    }

    const userDTO = new UserDTO(user)

    return userDTO
  }

  async getUserData(id) {
    const filterData = idFilter(id)
    const extendedData = extended(false)

    const combineAggregate = [...filterData, ...extendedData]

    const userData = await UserRepository.aggregate(combineAggregate)
    return userData[0]
  }

  async logout(token) {
    if (!token) {
      return false
    }

    await TokenService.removeToken(token)
    return true
  }

  async setConfirmCode(email) {
    const user = await UserRepository.findOne({ email })

    if (!user) {
      throw ApiError.HttpException(ERROR_USER.NOT_FOUND_BY_EMAIL(email))
    }

    const res = await ConfirmCodeService.createCode(user)
    return res
  }

  async saveNewUserData(userId, code, newEmail, newPassword) {
    await ConfirmCodeService.checkCode(code)

    const user = await UserRepository.findById(userId)

    if (!user) {
      throw ApiError.HttpException(ERROR_USER.NOT_FOUND_BY_ID)
    }

    if (newEmail) {
      await this.checkEmailExists(newEmail)
      user.email = newEmail
    }

    if (newPassword) {
      user.password = await bcrypt.hash(
        newPassword,
        parseInt(process.env.BCRYPT_SALT),
      )
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

    await UserRepository.findByIdAndUpdate(userData.id, {
      isActivated: true,
    })
    await ConfirmCodeService.deleteCode(confirmCode)

    return true
  }

  async repeatConfirmCode(id) {
    const userData = await this.getById(id)

    await ConfirmCodeService.repeatCode(id, userData.email)
    return { message: RESPONSE_MESSAGE.CONFIRM_CODE }
  }

  async getByEmail(email) {
    const userData = await UserRepository.findOne({ email })
    return userData
  }

  async checkEmailExists(email) {
    const candidate = await this.getByEmail(email)

    if (candidate) {
      throw ApiError.HttpException(ERROR_USER.EMAIL_EXISTS(email))
    }

    return candidate
  }

  async getHashPassword(password) {
    const hashPasswort = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT),
    )
    return hashPasswort
  }

  async resetPassword(email, confirmCode) {
    const userData = await this.getByEmail(email)
    await ConfirmCodeService.checkCode(confirmCode)

    const newPaswword = crypto
      .getRandomValues(new BigUint64Array(1))[0]
      .toString(36)
    const hashPassword = await this.getHashPassword(newPaswword)

    userData.password = hashPassword
    await userData.save()

    nodemailerService.sendNewPassword(newPaswword, email)

    return { message: RESPONSE_MESSAGE.RESET_PASSWORD(email) }
  }

  async getPaginationList(idList, limit, skip, filterType) {
    const filter = listFilter(idList, filterType)
    const extendedData = extended(true)
    const facet = facetData(skip, limit)

    const combineAggregate = [...filter, ...extendedData, ...facet]

    const resData = await UserRepository.aggregate(combineAggregate)

    if (!resData[0]) return { list: [], hasMore: false, total: 0 }

    if (resData[0].list.length === limit) {
      resData[0].hasMore = true
    } else {
      resData[0].hasMore = false
    }

    return resData[0]
  }
}

export default new UserService()
