import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const setRoleSchema = Joi.object({
  userId: Joi.objectId().required(),
  role: Joi.string(),
})

export const unSetRoleSchema = Joi.object({
  userId: Joi.objectId().required(),
  role: Joi.string(),
})

export const blockSchema = Joi.object({
  userId: Joi.objectId().required(),
})

export const unBlockSchema = Joi.object({
  userId: Joi.objectId().required(),
})
