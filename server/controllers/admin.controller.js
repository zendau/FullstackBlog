const ApiError = require("../exceprions/api.error")
const AdminService = require("../services/admin.service")

const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

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
}

module.exports = new AdminController()
