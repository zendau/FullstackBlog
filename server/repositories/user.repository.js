import UserModel from "../models/user.model.js"

class UserRepository {
  getRoles() {
    const roles = UserModel.schema.obj.roles.enum
    return roles
  }

  async create(data) {
    return UserRepository.create(data)
  }

  async findById(userId) {
    return UserRepository.findById(userId)
  }

  async findOne(condition) {
    return UserRepository.findOne(condition)
  }

  async aggregate(data) {
    return UserRepository.aggregate(data)
  }

  async findOneAndUpdate(condition, data, isNew) {
    return UserRepository.findOneAndUpdate(condition, data, isNew)
  }

  async findByIdAndUpdate(condition, data) {
    return UserRepository.findByIdAndUpdate(condition, data)
  }
}

export default new UserRepository()
