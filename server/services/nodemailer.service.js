const nodemailer = require("nodemailer")

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

  sendConfirmСode(code, email) {
    this.transporter.sendMail({
      to: email,
      from: process.env.MAILER_FROM,
      subject: 'Confirm code',
      html: `<p>Your confirm code - ${code}</p>`,
    })
  }

  sendNewPassword(password, email) {
    this.transporter.sendMail({
      to: email,
      from: process.env.MAILER_FROM,
      subject: 'Reseted password',
      html: `<p>Your new password - ${password}</p>`,
    })
  }



}

module.exports = new NodeMailerService()