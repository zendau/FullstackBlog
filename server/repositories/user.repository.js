import UserModel from "../models/user.model.js"

class UserRepository {
  getRoles() {
    const roles = UserModel.schema.obj.roles.enum
    return roles
  }

  async create(data) {
    return UserModel.create(data)
  }

  async findById(userId) {
    return UserModel.findById(userId)
  }

  async findOne(condition) {
    return UserModel.findOne(condition)
  }

  async aggregate(data) {
    return UserModel.aggregate(data)
  }

  async findOneAndUpdate(condition, data, isNew) {
    return UserModel.findOneAndUpdate(condition, data, isNew)
  }

  async findByIdAndUpdate(condition, data) {
    return UserModel.findByIdAndUpdate(condition, data)
  }
}

export default new UserRepository()
