const CommentService = require("../services/comment.service")
const ApiError = require("../exceprions/api.error")

const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

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
      // eslint-disable-next-line no-debugger
      debugger
      const userId = req.user.payload.id

      const inseredData = await CommentService.create(userId, postId, message)
      res.json(inseredData)
    } catch (e) {
      next(e)
    }
  }

  async editPostComment(req, res, next) {
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

  async deletePostComment(req, res, next) {
    try {
      const schema = Joi.object({
        commentId: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { commentId } = req.body
      const userId = req.user.payload.id

      const deleteStatus = await CommentService.delete(commentId, userId)
      res.json(deleteStatus)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new CommentController()
