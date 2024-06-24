import { ERROR_ADMIN } from "../constants/error.messages.js"
import ApiError from "../exceptions/api.error.js"
import UserRepository from "../repositories/user.repository.js"

class AdminService {
  getRoles() {
    const roles = UserRepository.getRoles()
    return roles
  }

  async setUserRole(userId, role) {
    const roles = this.getRoles()

    if (!roles.includes(role)) {
      throw ApiError.HttpException(ERROR_ADMIN.ROLE_NOT_FOUND)
    }

    const res = await UserRepository.findOneAndUpdate(
      { _id: userId },
      { $push: { roles: role } },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(ERROR_ADMIN.USER_NOT_FOUND)
    }

    return !!res
  }

  async unSetUserRole(userId, role) {
    const roles = this.getRoles()

    if (!roles.includes(role)) {
      throw ApiError.HttpException(ERROR_ADMIN.ROLE_NOT_FOUND)
    }

    const res = await UserRepository.findOneAndUpdate(
      { _id: userId },
      { $pull: { roles: role } },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(ERROR_ADMIN.USER_NOT_FOUND)
    }

    return !!res
  }

  async blockUser(userId) {
    const res = await UserRepository.findOneAndUpdate(
      { _id: userId },
      { isBlocked: true },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(ERROR_ADMIN.USER_NOT_FOUND)
    }

    return !!res
  }

  async unBlockUser(userId) {
    const res = await UserRepository.findOneAndUpdate(
      { _id: userId },
      { isBlocked: false },
      { new: true },
    )

    if (!res) {
      throw ApiError.HttpException(ERROR_ADMIN.USER_NOT_FOUND)
    }

    return !!res
  }
}

export default new AdminService()
