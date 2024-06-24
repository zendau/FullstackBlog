import tokenModel from "../models/token.model.js"

class TokenRepository {
  async create(data) {
    return tokenModel.create(data)
  }

  async findOne(condition) {
    return tokenModel.findOne(condition)
  }

  async deleteOne(condition) {
    return tokenModel.deleteOne(condition)
  }
}

export default new TokenRepository()
