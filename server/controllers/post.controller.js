import Joi from "joi"
import objectId from "joi-objectid"

import ApiError from "../exceprions/api.error.js"
import PostService from "../services/post.service.js"
import reactionService from "../services/reaction.service.js"

Joi.objectId = objectId(Joi)

class PostController {
  async create(req, res, next) {
    try {
      const schema = Joi.object({
        title: Joi.string().min(6).max(20).required(),
        body: Joi.string().required(),
        timeRead: Joi.number().required(),
        tags: Joi.array().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const postData = req.body

      const { file } = req
      if (file === undefined) {
        throw ApiError.HttpException(
          "file is required field and must be one of the types: png, jpg, jpeg",
        )
      }

      const { id, isActivated } = req.user.payload

      if (!isActivated) {
        res.json({
          message: "For this action you need to activate your account",
        })
        return
      }

      const data = await PostService.create(id, postData, file)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      const schema = Joi.object({
        postId: Joi.objectId().required(),
        title: Joi.string().min(6).max(20),
        body: Joi.string(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { postId, title, body } = req.body
      const userId = req.user.payload.id
      const { file } = req

      const data = await PostService.edit(postId, userId, title, body, file)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const userId = req.user.payload.id
      const data = await PostService.delete(req.params.id, userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        postId: Joi.objectId().required(),
        isLiked: [Joi.bool().required(), Joi.allow(null)],
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        exclude: Joi.array(),
        sort: Joi.string(),
        tag: Joi.string(),
        authorId: Joi.string(),
        postId: Joi.string(),
        substring: Joi.string(),
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
      const schema = Joi.object({
        postId: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

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
