import UserPostReadModel from "../models/userPostRead.model.js"

class UserPostReadService {
  async incCounter(postId, ip) {
    try {
      const status = await this.isPostRead(postId, ip)

      if (status) return

      this.setIsReadStatus(postId, ip)
    } catch {
      return false
    }
  }

  async isPostRead(postId, ip) {
    const res = await UserPostReadModel.findOne({
      $and: [{ post: postId }, { ip }],
    })
    return res
  }

  async setIsReadStatus(postId, ip) {
    const res = await UserPostReadModel.create({
      post: postId,
      ip,
    })

    return res
  }
}

export default new UserPostReadService()
