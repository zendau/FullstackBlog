import ApiError from "../exceprions/api.error.js"
import PostService from "../services/post.service.js"
import reactionService from "../services/reaction.service.js"

class PostController {
  async create(req, res, next) {
    try {
      const postData = req.body

      const { file } = req
      if (file === undefined) {
        throw ApiError.HttpException(
          "file is required field and must be one of the types: png, jpg, jpeg",
        )
      }

      const { id: userId, isActivated } = req.user.payload

      if (!isActivated) {
        throw ApiError.HttpException(
          "For this action you need to activate your account",
        )
      }

      const data = await PostService.create(userId, postData, file)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      const postData = req.body
      const userId = req.user.payload.id
      const { file } = req

      const data = await PostService.edit(userId, postData, file)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.payload.id
      const data = await PostService.delete(req.params.id, userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const { id: postId } = req.params
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

      const data = await PostService.getOne(postId, ip)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async reactionPost(req, res, next) {
    try {
      const { postId, isLiked } = req.query
      const userId = req.user.payload.id

      const resData = await PostService.postReaction(postId, userId, isLiked)
      res.json(resData)
    } catch (e) {
      next(e)
    }
  }

  async getPostsPagination(req, res, next) {
    try {
      const { limit, page, exclude, sort, tag, authorId, substring, postId } =
        req.query

      const skipValue = (page ?? 0) * limit

      const skip = Number.isNaN(skipValue) ? 0 : skipValue

      const limitValue = limit ? parseInt(limit) : 1

      const data = await PostService.getPostsPagination(
        exclude,
        limitValue,
        skip,
        sort,
        {
          postId,
          substring,
          tag,
          authorId,
        },
      )

      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getPostReactionStatus(req, res, next) {
    try {
      const { postId } = req.query
      const userId = req.user.payload.id

      const resData = await reactionService.reactionStatus(userId, postId)
      res.json(resData)
    } catch (e) {
      next(e)
    }
  }
}

export default new PostController()
