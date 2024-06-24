import UserPostReadRepository from "../repositories/userPostRead.repository"

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
    const res = await UserPostReadRepository.findOne({
      $and: [{ post: postId }, { ip }],
    })
    return res
  }

  async setIsReadStatus(postId, ip) {
    const res = await UserPostReadRepository.create({
      post: postId,
      ip,
    })

    return res
  }

  async deleteManyByPost(postId) {
    await UserPostReadRepository.deleteMany({ post: postId })
  }
}

export default new UserPostReadService()
