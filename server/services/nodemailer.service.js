import nodemailer from "nodemailer"

import { ERROR_NODEMAILER } from "../constants/error.messages.js"
import { CONFIRM_CODE, NEW_PASSWORD } from "../constants/mail.messages.js"
import ApiError from "../exceptions/api.error.js"

class NodeMailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    })
  }

  async sendConfirmСode(code, email) {
    try {
      await this.transporter.sendMail({
        to: email,
        from: process.env.MAILER_FROM,
        subject: CONFIRM_CODE.SUBJECT,
        html: CONFIRM_CODE.HTML(code),
      })
    } catch (e) {
      throw ApiError.InternalError(ERROR_NODEMAILER.SEND)
    }
  }

  async sendNewPassword(password, email) {
    try {
      await this.transporter.sendMail({
        to: email,
        from: process.env.MAILER_FROM,
        subject: NEW_PASSWORD.SUBJECT,
        html: NEW_PASSWORD.HTML(password),
      })
    } catch (e) {
      throw ApiError.InternalError(ERROR_NODEMAILER.SEND)
    }
  }
}

export default new NodeMailerService()
