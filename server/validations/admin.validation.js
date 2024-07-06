import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const setRolesSchema = Joi.object({
  userId: Joi.objectId().required(),
  roles: Joi.array().required(),
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
