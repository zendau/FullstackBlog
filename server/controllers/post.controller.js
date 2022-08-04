const PostService = require("../services/post.service")
const CommentService = require('../services/comment.serice')

const ApiError = require("../exceprions/api.error")

const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)


class PostController {

  async create(req, res, next) {
    try {
      const schema = Joi.object({
        title: Joi.string().min(6).max(20).required(),
        body: Joi.string().required()
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { title, body } = req.body

      const file = req.file
      if (file === undefined) {
        throw ApiError.HttpException('file is required field and must be one of the types: png, jpg, jpeg')
      }

      const author = req.user.payload.id
      const data = await PostService.create(author, title, body, file)
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
        body: Joi.string()
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { postId, title, body } = req.body
      const userId = req.user.payload.id
      const file = req.file

      const data = await PostService.edit(postId, userId, title, body, file)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required()
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
        id: Joi.objectId().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { id } = req.params
      const userId = req.user.payload.id

      const data = await PostService.getOne(id, userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getPostsBySubString(req, res, next) {
    try {
      debugger
      const schema = Joi.object({
        substring: Joi.string().min(3).max(20).required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { substring } = req.params

      const data = await PostService.searchBySubstring(substring)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async reactionPost(req, res, next) {
    debugger
    try {      
      const schema = Joi.object({
        postId: Joi.objectId().required(),
        isLiked: [Joi.bool().required(), Joi.allow(null)]
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

  async getUserPosts(req, res, next) {
    try {
      const schema = Joi.object({
        currentPage: Joi.number().required(),
        limit: Joi.number().required()
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const userId = req.user.payload.id
      const { currentPage, limit } = req.query
      const data = await PostService.getLimitUserPosts(currentPage, limit, userId)
      
      res.json(data)

    } catch (e) {
      next(e)
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const data = await PostService.getAllPosts()
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getLimitPosts(req, res, next) {
    try {
      const schema = Joi.object({
        currentPage: Joi.number().required(),
        limit: Joi.number().required()
      })
      const { error } = schema.validate(req.query)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { currentPage, limit } = req.query
      const data = await PostService.getLimitPosts(currentPage, limit)

      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async addPostComment(req, res, next) {
    try {
      const schema = Joi.object({
        postId: Joi.objectId().required(),
        message: Joi.string().required()
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { postId, message } = req.body

      const userId = req.user.payload.id

      const inseredData = await PostService.addPostComment(userId, postId, message)
      res.json(inseredData)
    } catch (e) {
      next(e)
    }
  }

  async editPostComment(req, res, next) {
    try {
      const schema = Joi.object({
        commentId: Joi.objectId().required(),
        message: Joi.string().required()
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { commentId, message } = req.body
      const userId = req.user.payload.id

      const updatedStatus = await CommentService.edit(commentId, userId, message)
      res.json(updatedStatus)
    } catch (e) {
      next(e)
    }
  }

  async deletePostComment(req, res, next) {
    try {
      const schema = Joi.object({
        commentId: Joi.objectId().required()
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

module.exports = new PostController()