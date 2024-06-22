import ApiError from "../exceptions/api.error.js"
import TokenService from "../services/token.service.js"

function authGuard(role) {
  return function (req, res, next) {
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

export const userGuard = authGuard("user")
export const adminGuard = authGuard("admin")
export const noAuth = authGuard("noAuth")
