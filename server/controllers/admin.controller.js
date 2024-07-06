import AdminService from "../services/admin.service.js"

class AdminController {
  getRoles(req, res) {
    const roles = AdminService.getRoles()

    return res.json(roles)
  }

  async setUserRoles(req, res, next) {
    try {
      const { userId, roles } = req.body

      const data = await AdminService.setUserRoles(userId, roles)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async blockUser(req, res, next) {
    try {
      const { userId } = req.body

      const data = await AdminService.blockUser(userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async unBlockUser(req, res, next) {
    try {
      const { userId } = req.body

      const data = await AdminService.unBlockUser(userId)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new AdminController()
