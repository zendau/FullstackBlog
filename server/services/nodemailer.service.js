const nodemailer = require("nodemailer");

class NodeMailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'carmel.mante81@ethereal.email',
        pass: 'MdgrMz8BC6kY9jrPau',
      },
    });
  }

  sendConfirmСode(code, email) {
    this.transporter.sendMail({
      to: email,
      from: 'nest@exampla.com',
      subject: 'Confirm code',
      html: `<p>Your confirm code - ${code}</p>`,
    })
  }

  sendNewPassword(password, email) {
    this.transporter.sendMail({
      to: email,
      from: 'nest@exampla.com',
      subject: 'Reseted password',
      html: `<p>Your new password - ${password}</p>`,
    })
  }



}

module.exports = new NodeMailerService()