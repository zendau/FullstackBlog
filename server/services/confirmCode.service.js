const confirmCodeModel = require("../models/confirmCode.model")
const uuid = require("uuid")
const NodeMailerService = require('./nodemailer.service')

class ConfirmCodeService {

    async createCode(userId, email) {
        const confirmCode = uuid.v4()

        const codeData = await confirmCodeModel.findOne({ user: userId })

        if (codeData) {
            codeData.code = confirmCode
            return await codeData.save()
        }

        const code = await confirmCodeModel.create({
            user: userId,
            code: confirmCode
        })

        NodeMailerService.sendConfirmСode(confirmCode, email)

        return code

    }

    async deleteCode(code) {
        const codeData = await confirmCodeModel.deleteOne({ code })
        return codeData;
    }

    async checkCode(code) {
        const codeData = await confirmCodeModel.findOne({ code })

        return !!codeData;
    }

    async repeatCode(id, email) {
        const codeData = await confirmCodeModel.findOne({ user: id })


        if (!codeData) {
            throw ApiError.HttpException('Confirm code was not found')
        }


        NodeMailerService.sendConfirmСode(codeData.code, email)

        return true
    }
}

module.exports = new ConfirmCodeService()