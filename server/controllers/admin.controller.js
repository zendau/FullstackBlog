import Joi from "joi"
import objectId from "joi-objectid"

import ApiError from "../exceptions/api.error.js"
import AdminService from "../services/admin.service.js"

Joi.objectId = objectId(Joi)

class AdminController {
  getRoles(req, res) {
    const roles = AdminService.getRoles()

    return res.json(roles)
  }

  async setUserRole(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
        role: Joi.string(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId, role } = req.body

      const data = await AdminService.setUserRole(userId, role)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async unSetUserRole(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
        role: Joi.string(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId, role } = req.body

      const data = await AdminService.unSetUserRole(userId, role)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async blockUser(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId } = req.body

      const data = await AdminService.blockUser(userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async unBlockUser(req, res, next) {
    try {
      const schema = Joi.object({
        userId: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.body)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { userId } = req.body

      const data = await AdminService.unBlockUser(userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new AdminController()
