import UserPostReadModel from "../models/userPostRead.model.js"

class UserPostReadRepository {
  async create(data) {
    return UserPostReadModel.create(data)
  }

  async findOne(condition) {
    return UserPostReadModel.findOne(condition)
  }

  async deleteMany(condition) {
    return UserPostReadModel.deleteMany(condition)
  }
}

export default new UserPostReadRepository()
