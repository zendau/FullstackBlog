import jwt from "jsonwebtoken"

import TokenRepository from "../repositories/token.repository.js"

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    })
    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData.payload
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken) {
    const tokenData = await TokenRepository.findOne({ refreshToken })
    return tokenData
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenRepository.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      const resToken = await tokenData.save()
      return resToken
    }

    const token = await TokenRepository.create({
      user: userId,
      refreshToken,
    })

    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenRepository.deleteOne({ refreshToken })
    return tokenData
  }
}

export default new TokenService()
