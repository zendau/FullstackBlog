import ReactionRepository from "../repositories/reaction.repository.js"

class ReactionService {
  async add(postId, userId, isLiked) {
    await ReactionRepository.create({
      post: postId,
      user: userId,
      isLiked,
    })
  }

  async setReaction(postId, userId, isLiked) {
    if (isLiked === "null") {
      const deletedReactionStatus = await this.deleteReaction(postId, userId)
      return deletedReactionStatus
    }

    const res = await ReactionRepository.findOneAndUpdate(
      {
        $and: [{ post: postId }, { user: userId }],
      },
      { $set: { isLiked } },
    )

    if (!res && isLiked !== "null") {
      await this.add(postId, userId, isLiked)
    }

    if (res === null) {
      return false
    }
    return true
  }

  async deleteReaction(postId, userId) {
    const res = await ReactionRepository.findOneAndDelete({
      $and: [{ post: postId }, { user: userId }],
    })

    if (res === null) {
      return false
    }
    return true
  }

  async deletePostReactions(postId) {
    await ReactionRepository.deleteMany({ post: postId })
  }

  async reactionStatus(userId, postId) {
    try {
      const res = await ReactionRepository.findOne({
        post: postId,
        user: userId,
      })
      return res.isLiked
    } catch {
      return null
    }
  }
}

export default new ReactionService()
