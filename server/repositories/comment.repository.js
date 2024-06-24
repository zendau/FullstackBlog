import commentModel from "../models/comment.model.js"

class CommentRepository {
  async create(data) {
    return commentModel.create(data)
  }

  async findOneAndUpdate(condition, data, isNew) {
    return commentModel.findOneAndUpdate(condition, data, isNew)
  }

  async findOneAndDelete(condition) {
    return commentModel.findOneAndDelete(condition)
  }

  async deleteMany(condition) {
    return commentModel.deleteMany(condition)
  }

  async aggregate(condition) {
    return commentModel.aggregate(condition)
  }
}

export default new CommentRepository()
