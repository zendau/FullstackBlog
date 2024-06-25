import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const createSchema = Joi.object({
  postId: Joi.objectId().required(),
  message: Joi.string().required(),
})

export const editSchema = Joi.object({
  commentId: Joi.objectId().required(),
  message: Joi.string().required(),
})

export const deleteSchema = Joi.object({
  commentId: Joi.objectId().required(),
})

export const listSchema = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
  exclude: Joi.array(),
  authorId: Joi.string(),
  postId: Joi.string(),
})
