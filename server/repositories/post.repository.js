import { PostModel } from "../models/post.model.js"

class PostRepository {
  async create(data) {
    return PostModel.create(data)
  }

  async update(postId, data) {
    return PostModel.findByIdAndUpdate(postId, data)
  }

  async findById(postId) {
    return PostModel.findById(postId)
  }

  async findByIdAndUpdate(postId, data) {
    return PostModel.findByIdAndUpdate(postId, data)
  }

  async aggregate(pipeline) {
    return PostModel.aggregate(pipeline)
  }

  // async deleteOne(post) {
  //   return post.deleteOne()
  // }
}

export default new PostRepository()
