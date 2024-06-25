import AdminService from "../services/admin.service.js"

class AdminController {
  getRoles(req, res) {
    const roles = AdminService.getRoles()

    return res.json(roles)
  }

  async setUserRole(req, res, next) {
    try {
      const { userId, role } = req.body

      const data = await AdminService.setUserRole(userId, role)
      res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async unSetUserRole(req, res, next) {
    try {
      const { userId, role } = req.body

      const data = await AdminService.unSetUserRole(userId, role)
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
