import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const createSchema = Joi.object({
  title: Joi.string().min(6).max(20).required(),
  preview: Joi.string().required(),
  timeRead: Joi.number().required(),
  tags: Joi.string().required(),
  blocks: Joi.string().required(),
})

export const editSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().min(6).max(20),
  preview: Joi.string(),
  timeRead: Joi.number(),
  tags: Joi.string(),
  blocks: Joi.string(),
})

export const deleteSchema = Joi.object({
  id: Joi.objectId().required(),
})

export const getOneSchema = Joi.object({
  id: Joi.objectId().required(),
})

export const paginationScheme = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
  exclude: Joi.array(),
  sort: Joi.string(),
  tag: Joi.string(),
  authorId: Joi.string(),
  postId: Joi.string(),
  substring: Joi.string(),
})

export const reactSchema = Joi.object({
  postId: Joi.objectId().required(),
  isLiked: [Joi.bool().required(), Joi.allow(null)],
})

export const reactStatusSchema = Joi.object({
  postId: Joi.objectId().required(),
})
