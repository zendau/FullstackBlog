import crypto from "crypto"

import ApiError from "../exceptions/api.error.js"
import confirmCodeModel from "../models/confirmCode.model.js"
import NodeMailerService from "./nodemailer.service.js"

class ConfirmCodeService {
  async createCode(userData) {
    try {
      const confirmCode = crypto.randomInt(1000000).toString()
      const codeData = await confirmCodeModel.findOne({ user: userData.id })

      if (codeData) {
        codeData.code = confirmCode
        await codeData.save()
      } else {
        await confirmCodeModel.create({
          user: userData.id,
          code: confirmCode,
        })
      }

      NodeMailerService.sendConfirmСode(confirmCode, userData.email)
      return true
    } catch (e) {
      throw ApiError.HttpException(
        'Error generating confirmation token. Please check the entered data and try again."',
      )
    }
  }

  async deleteCode(code) {
    const codeData = await confirmCodeModel.deleteOne({ code })
    return codeData
  }

  async checkCode(code) {
    const codeData = await confirmCodeModel.findOne({ code })

    const confirmCodeStatus = !!codeData

    if (confirmCodeStatus) {
      await this.deleteCode(code)
    } else {
      throw ApiError.HttpException("Wrong confirm code")
    }
  }

  async repeatCode(id, email) {
    const codeData = await confirmCodeModel.findOne({ user: id })

    if (!codeData) {
      throw ApiError.HttpException("Confirm code was not found")
    }

    NodeMailerService.sendConfirmСode(codeData.code, email)
    return true
  }
}

export default new ConfirmCodeService()
