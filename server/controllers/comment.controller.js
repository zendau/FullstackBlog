import Joi from "joi"
import objectId from "joi-objectid"

import ApiError from "../exceptions/api.error.js"
import CommentService from "../services/comment.service.js"

Joi.objectId = objectId(Joi)

class CommentController {
  async create(req, res, next) {
    try {
      const schema = Joi.object({
        postId: Joi.objectId().required(),
        message: Joi.string().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        commentId: Joi.objectId().required(),
        message: Joi.string().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        commentId: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        exclude: Joi.array(),
        authorId: Joi.string(),
        postId: Joi.string(),
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
