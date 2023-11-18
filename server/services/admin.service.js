const UserModel = require("../models/user.model")
const ApiError = require("../exceprions/api.error")

class AdminService {
  getRoles() {
    const roles = UserModel.schema.obj.roles.enum
    return roles
  }

  async setUserRole(userId, role) {
    const roles = this.getRoles()

    if (!roles.includes(role)) {
      throw ApiError.HttpException(`Role "${role}" not found`)
    }

    const res = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { roles: role } },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(`UserId "${userId}" not found`)
    }

    return !!res
  }

  async unSetUserRole(userId, role) {
    const roles = this.getRoles()

    if (!roles.includes(role)) {
      throw ApiError.HttpException(`Role "${role}" not found`)
    }

    const res = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { roles: role } },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(`UserId "${userId}" not found`)
    }

    return !!res
  }

  async blockUser(userId) {
    const res = await UserModel.findOneAndUpdate(
      { _id: userId },
      { isBlocked: true },
    )

    if (!res) {
      throw ApiError.HttpException(`UserId "${userId}" not found`)
    }

    return !!res
  }

  async unBlockUser(userId) {
    const res = await UserModel.findOneAndUpdate(
      { _id: userId },
      { isBlocked: false },
    )

    if (!res) {
      throw ApiError.HttpException(`UserId "${userId}" not found`)
    }

    return !!res
  }
}

module.exports = new AdminService()
