import Joi from "joi"
import objectId from "joi-objectid"

Joi.objectId = objectId(Joi)

export const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
})
export const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(40),
})

export const sendConfirmCodeSchema = Joi.object({
  email: Joi.string().email(),
})

export const saveNewUserDataSchema = Joi.object({
  code: Joi.string().required(),
  newEmail: Joi.string().email(),
  newPassword: Joi.string().min(6).max(20),
})
export const activateAccountScheme = Joi.object({
  confirmCode: Joi.number().required(),
})

export const getUserByIdScheme = Joi.object({
  id: Joi.objectId().required(),
})

export const paginationScheme = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
  exclude: Joi.array(),
  substring: Joi.string(),
})
