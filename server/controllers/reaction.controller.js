import ReactionService from "../services/reaction.service.js"

class ReactionController {
  async setReaction(req, res, next) {
    try {
      const { postId, isLiked } = req.query
      const userId = req.user.payload.id

      const resData = await ReactionService.setReaction(postId, userId, isLiked)
      res.json(resData)
    } catch (e) {
      next(e)
    }
  }

  async getReactionStatus(req, res, next) {
    try {
      const { postId } = req.query
      const userId = req.user.payload.id

      const resData = await ReactionService.reactionStatus(userId, postId)
      res.json(resData)
    } catch (e) {
      next(e)
    }
  }
}

export default new ReactionController()
