import UserPostReadModel from "../models/userPostRead.model.js"
import PostModel from "../models/post.model.js"

class UserPostReadService {
  async chechIsReadStatus(postId, ip) {
    const res = await UserPostReadModel.findOne({
      $and: [{ post: postId }, { ip }],
    })

    return !res
  }

  async setIsReadStatus(postId, ip) {
    const res = await UserPostReadModel.create({ post: postId, ip })

    await this.postIncReadCount(postId)

    return res
  }

  async postIncReadCount(postId) {
    const res = await PostModel.updateOne(
      { _id: postId },
      { $inc: { readCount: 1 } },
    )

    return !!res
  }
}

export default new UserPostReadService()
