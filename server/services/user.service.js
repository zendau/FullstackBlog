import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

// import PostDataDTO from "../dtos/postData.dto.js"
import UserDTO from "../dtos/user.dto.js"
import ApiError from "../exceprions/api.error.js"
import userModel from "../models/user.model.js"
import ConfirmCodeService from "./confirmCode.service.js"
import nodemailerService from "./nodemailer.service.js"
import PostService from "./post.service.js"
import TokenService from "./token.service.js"

class UserService {
  async registration(email, password) {
    await this.checkEmail(email)
    const hashPass = await this.getHashPassword(password)

    const user = await userModel.create({
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

    const userDTO = users.map((user) => new UserDTO(user))
    return userDTO
  }

  async getById(id) {
    const user = await userModel.findById(id)

    if (user === null) {
      throw ApiError.HttpException(`User id ${id} is not found`)
    }

    const userDTO = new UserDTO(user)

    return userDTO
  }

  userLookup() {
    return [
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "posts._id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "userpostreads",
          localField: "posts._id",
          foreignField: "post",
          as: "postreads",
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "posts._id",
          foreignField: "post",
          as: "react",
        },
      },
    ]
  }

  async getUserData(id) {
    const postsRating = await PostService.postsRating(true)
    const combineAggregate = [
      {
        $match: {
          _id: {
            $eq: mongoose.Types.ObjectId(id),
          },
        },
      },
      ...this.userLookup(),
      ...postsRating,
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          counterLikes: 1,
          counterDislikes: 1,
          counterReads: 1,
          counterComments: 1,
          rating: 1,
          id: "$user._id",
          _id: 0,
          isBlocked: "$user.isBlocked",
          email: "$user.email",
        },
      },
    ]

    const userData = await userModel.aggregate(combineAggregate)
    return userData
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
    }

    if (newEmail) {
      await this.checkEmail(newEmail)
      user.email = newEmail
    }

    if (newPassword) {
      const hashNewPass = await bcrypt.hash(
        newPassword,
        parseInt(process.env.BCRYPT_SALT),
      )
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

    await userModel.findByIdAndUpdate(userData.id, {
      isActivated: true,
    })
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
      throw ApiError.HttpException(
        `user with email - ${email} is already registered`,
      )
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

    const newPaswword = uuid.v4()
    const hashPassword = await this.getHashPassword(newPaswword)

    userData.password = hashPassword
    await userData.save()

    nodemailerService.sendNewPassword(newPaswword, email)

    return { message: `New password was send to ${email}` }
  }
}

export default new UserService()
