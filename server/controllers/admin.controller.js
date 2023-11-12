// const Joi = require("joi")
// const ApiError = require("../exceprions/api.error")
const AdminService = require("../services/admin.service")

class AdminController {
  getRoles(req, res) {
    const roles = AdminService.getRoles()

    return res.json(roles)
  }
}

module.exports = new AdminController()
