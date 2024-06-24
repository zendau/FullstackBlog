import crypto from "crypto"

import { ERROR_CONFIRM_CODE } from "../constants/error.messages.js"
import ApiError from "../exceptions/api.error.js"
import ConfirmCodeRepository from "../repositories/confirmCode.repository.js"
import NodeMailerService from "./nodemailer.service.js"

class ConfirmCodeService {
  async createCode(userData) {
    try {
      const confirmCode = crypto.randomInt(1000000).toString()
      const codeData = await ConfirmCodeRepository.findOne({
        user: userData.id,
      })

      if (codeData) {
        codeData.code = confirmCode
        await codeData.save()
      } else {
        await ConfirmCodeRepository.create({
          user: userData.id,
          code: confirmCode,
        })
      }

      NodeMailerService.sendConfirmСode(confirmCode, userData.email)
      return true
    } catch (e) {
      throw ApiError.HttpException(ERROR_CONFIRM_CODE.CREATE)
    }
  }

  async deleteCode(code) {
    const codeData = await ConfirmCodeRepository.deleteOne({ code })
    return codeData
  }

  async checkCode(code) {
    const codeData = await ConfirmCodeRepository.findOne({ code })

    const confirmCodeStatus = !!codeData

    if (confirmCodeStatus) {
      await this.deleteCode(code)
    } else {
      throw ApiError.HttpException(ERROR_CONFIRM_CODE.WRONG)
    }
  }

  async repeatCode(id, email) {
    const codeData = await ConfirmCodeRepository.findOne({ user: id })

    if (!codeData) {
      throw ApiError.HttpException(ERROR_CONFIRM_CODE.NOT_FOUND)
    }

    NodeMailerService.sendConfirmСode(codeData.code, email)
    return true
  }
}

export default new ConfirmCodeService()
