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

  async sendConfirmСode(code, email) {
    await this.transporter.sendMail({
      to: email,
      from: 'nest@exampla.com',
      subject: 'Confirm code',
      html: `<p>Your confirm code - ${code}</p>`,
    })
    return true;
  }



}

module.exports = new NodeMailerService()