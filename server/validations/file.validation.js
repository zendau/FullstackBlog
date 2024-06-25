import Joi from "joi"

export const updateSchema = Joi.object({
  id: Joi.objectId().required(),
})

export const deleteSchema = Joi.object({
  id: Joi.objectId().required(),
})

export const getOneSchema = Joi.object({
  id: Joi.objectId().required(),
})

export const downloadSchema = Joi.object({
  id: Joi.string().required(),
})
