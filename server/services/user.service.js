const userModel = require("../models/user.model")
const ApiError = require("../exceprions/api.error");
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const ObjectId = require('mongodb').ObjectID

const UserDto = require("../dtos/user.dto")
const TokenService = require("../services/token.service")
const ConfirmCodeService = require("../services/confirmCode.service")

class UserService {

    async registration(email, password) {

        this.checkEmail(email)
        const hashPass = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))

        const user = await userModel.create({
            email,
            password: hashPass
        })

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens(userDto)
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        await ConfirmCodeService.createCode(userDto.id, userDto.email)

        return tokens
    }

    async login(email, password) {
        const user = await userModel.findOne({ email })

        if (!user) {
            throw ApiError.HttpException("bad credentials")
        }

        const passwordEquals = await bcrypt.compare(password, user.password)

        if (!passwordEquals) {
            throw ApiError.HttpException("bad credentials")
        }

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens(userDto)
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, userDto }
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
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await userModel.find();

        const userDto = users.map(user => new UserDto(user))
        return userDto;
    }

    async getById(id) {
        if (!ObjectId.isValid(id.toString())) {
            throw ApiError.HttpException(`id ${id} is not objectId`)
        }
        const user = await userModel.findById(id);

        if (user === null) {
            throw ApiError.HttpException(`Wrong user id. User id ${fileId} is not found`)
        }

        const userDto = new UserDto(user)

        return userDto;
    }


    async logout(token) {

        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        const res = await TokenService.removeToken(token)

        if (res.ok !== 1) {
            throw ApiError.UnauthorizedError();
        }

        return res
    }

    async setConfirmCode(userId) {
        const user = await userModel.findById(userId)

        if (!user) {
            throw ApiError.HttpException(`Not found user with id - ${userId}`)
        }

        const res = await ConfirmCodeService.createCode(userId)
        return res

    }

    async saveNewUserData(userId, code, newEmail, newPassword) {

        const checkCodeValue = await ConfirmCodeService.checkCode(code)

        if (!checkCodeValue) {
            throw ApiError.HttpException(`Wrong code`)
        }


        const user = await userModel.findById(userId)

        if (!user) {
            throw ApiError.HttpException(`Not found user with id - ${userId}`)
        } else {


            this.checkEmail(email)

            const hashNewPass = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT))

            user.email = newEmail
            user.password = hashNewPass

            const userModel = await user.save()
            const userDto = new UserDto(userModel)

            await ConfirmCodeService.deleteCode(code)

            const tokens = TokenService.generateTokens(userDto)
            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            return { ...tokens, userDto }
        }
    }

    async activateAccount(userId, confirmCode) {
        const userData = await this.getById(userId)

        const checkCode = await ConfirmCodeService.checkCode(confirmCode)

        if (!checkCode) {
            throw ApiError.HttpException('Wrong confirm code')
        }

        await userModel.findByIdAndUpdate(userData.id,
            {
                isActivated: true
            }
        )
        await ConfirmCodeService.deleteCode(confirmCode)

        return true

    }

    async repeatConfirmCode(id) {
        const userData = await this.getById(id)

        await ConfirmCodeService.repeatCode(id, userData.email)
        return true
    }

    async checkEmail(email) {
        const candidate = await userModel.findOne({ email })

        if (candidate) {
            throw ApiError.HttpException(`user with email - ${email} is already registered`)
        }

        return true
    }


}

module.exports = new UserService()