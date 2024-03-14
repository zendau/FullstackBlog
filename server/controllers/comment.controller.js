import Joi from "joi"
import objectId from "joi-objectid"

import ApiError from "../exceprions/api.error.js"
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
}

export default new CommentController()
