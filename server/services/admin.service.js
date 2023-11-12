const UserModel = require("../models/user.model")

class AdminService {
  getRoles() {
    // eslint-disable-next-line no-debugger
    debugger

    const roles = UserModel.schema.obj.roles.enum

    return roles
  }
}

module.exports = new AdminService()
