import Joi from "joi"
import objectId from "joi-objectid"

import CommentService from "../services/comment.service.js"

Joi.objectId = objectId(Joi)

class CommentController {
  async create(req, res, next) {
    try {
      const { postId, message } = req.body

      const userId = req.user.payload.id

      const inseredData = await CommentService.create(userId, postId, message)
      res.json(inseredData)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      const { commentId, message } = req.body
      const userId = req.user.payload.id

      const updatedStatus = await CommentService.edit(
        commentId,
        userId,
        message,
      )
      res.json(updatedStatus)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const { commentId } = req.body
      const userId = req.user.payload.id

      await CommentService.delete(commentId, userId)
      res.json(true)
    } catch (e) {
      next(e)
    }
  }

  async list(req, res, next) {
    try {
      const { limit, page, exclude, authorId, postId } = req.query

      const skipValue = (page ?? 0) * limit

      const skip = Number.isNaN(skipValue) ? 0 : skipValue

      const limitValue = limit ? parseInt(limit) : 1

      const data = await CommentService.getCommentsPagination(
        exclude,
        limitValue,
        skip,
        {
          postId,
          authorId,
        },
      )

      res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new CommentController()
