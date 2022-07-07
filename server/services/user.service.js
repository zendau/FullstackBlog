const userModel = require("../models/user.model")
const ApiError = require("../exceprions/api.error");
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const ObjectId =  require('mongodb').ObjectID

const UserDto = require("../dtos/user.dto")
const TokenService = require("../services/token.service")
const ConfirmCodeService = require("../services/confirmCode.service")

class UserService {

    async registration(email, password) {
        const candidate = await userModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest("user is already registered")
        }

        const hashPass = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
        const activateLink = uuid.v4()

        const user = await userModel.create({
            email,
            password: hashPass,
            activationLink: activateLink

        })

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens(userDto)
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, userDto}
    }

    async login(email, password) {
        const user = await userModel.findOne({email})

        if (!user) {
            throw ApiError.BadRequest("user is not found")
        }

        const passwordEquals = await bcrypt.compare(password, user.password)

        if (!passwordEquals) {
            throw ApiError.BadRequest("wrong password")
        }

        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens(userDto)
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, userDto}
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await userModel.find();

        const userDto = users.map(user => new UserDto(user))
        return userDto;
    }

    async getById(id) {
        if (!ObjectId.isValid(id.toString())) {
            throw ApiError.BadRequest("Wrong id", `id ${id} is not objectId`)
        }
        const user = await userModel.findById(id);
        console.log('user', user)
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

    async updateUserData(userId, newEmail) {
        const user = await userModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest(`Not found user with id - ${userId}`)
        }

        const checkEmail = await userModel.findOne({email: newEmail})


        if (!checkEmail) {

            const res = await ConfirmCodeService.createCode(userId)

            return res

        } else {
            throw ApiError.BadRequest(`Email - ${newEmail} is already used`)
        }



    }

    async saveNewUserData (userId, code, newEmail, newPassword) {

        const checkCodeValue = await ConfirmCodeService.checkCode(code)

        if (!checkCodeValue) {
            throw ApiError.BadRequest(`Wrong code`)
        }


        const user = await userModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest(`Not found user with id - ${userId}`)
        } else {
            const activateLink = uuid.v4()

            const hashNewPass = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT))

            user.email = newEmail
            user.password = hashNewPass
            user.isActivated = false
            user.activationLink = activateLink

            const userModel = await user.save()
            const userDto = new UserDto(userModel)

            await ConfirmCodeService.deleteCode(code)

            const tokens = TokenService.generateTokens(userDto)
            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            return {...tokens, userDto}
        }



    }


}

module.exports = new UserService()