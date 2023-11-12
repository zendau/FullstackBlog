const ApiError = require("../exceprions/api.error")
const TokenService = require("../services/token.service")

function authGuard(role) {
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }

      const accessToken = authorizationHeader.split(" ")[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }

      const userData = TokenService.validateAccessToken(accessToken)
      if (!userData) {
        return next(ApiError.UnauthorizedError())
      }

      if (role && !userData.payload.roles.includes(role)) {
        return next(ApiError.ForbiddenError())
      }

      req.user = userData
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }
}

module.exports = {
  authGuard: authGuard(),
  userGuard: authGuard("user"),
  adminGuard: authGuard("admin"),
}
