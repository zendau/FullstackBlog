import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const reactSchema = Joi.object({
  postId: Joi.objectId().required(),
  isLiked: [Joi.bool().required(), Joi.allow(null)],
})

export const reactStatusSchema = Joi.object({
  postId: Joi.objectId().required(),
})
