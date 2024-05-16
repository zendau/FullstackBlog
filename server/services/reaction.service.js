import reactionModel from "../models/reaction.model.js"

class ReactionService {
  async add(postId, userId, isLiked) {
    await reactionModel.create({
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

    const res = await reactionModel.findOneAndUpdate(
      {
        $and: [{ post: postId }, { user: userId }],
      },
      { $set: { isLiked } },
    )

    if (res === null) {
      return false
    }
    return true
  }

  async deleteReaction(postId, userId) {
    const res = await reactionModel.findOneAndDelete({
      $and: [{ post: postId }, { user: userId }],
    })

    if (res === null) {
      return false
    }
    return true
  }

  async deletePostReactions(postId) {
    await reactionModel.deleteMany({ post: postId })
  }

  async reactionStatus(userId, postId) {
    try {
      const res = await reactionModel.findOne({ post: postId, user: userId })
      return res.isLiked
    } catch {
      return null
    }
  }
}

export default new ReactionService()
