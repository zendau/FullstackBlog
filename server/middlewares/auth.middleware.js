const ApiError = require("../exceprions/api.error")
const TokenService = require("../services/token.service")

function authGuard(role) {
  return function (req, res, next) {
    // eslint-disable-next-line no-debugger
    debugger

    try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        if (role === "noAuth") {
          return next()
        }

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

      if (userData.payload.isBlocked) {
        return next(ApiError.ForbiddenError())
      }

      if (role && role !== "noAuth" && !userData.payload.roles.includes(role)) {
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
  noAuth: authGuard("noAuth"),
}
