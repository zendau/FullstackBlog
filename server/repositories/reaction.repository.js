import reactionModel from "../models/reaction.model.js"

class ReactionRepository {
  async create(data) {
    return reactionModel.create(data)
  }

  async findOneAndUpdate(condition, data) {
    return reactionModel.findOneAndUpdate(condition, data)
  }

  async findOneAndDelete(condition) {
    return reactionModel.findOneAndDelete(condition)
  }

  async deleteMany(condition) {
    return reactionModel.deleteMany(condition)
  }

  async findOne(condition) {
    return reactionModel.findOne(condition)
  }
}

export default new ReactionRepository()
