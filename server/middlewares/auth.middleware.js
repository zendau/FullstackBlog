const ApiError = require('../exceprions/api.error')
const TokenService = require('../services/token.service')

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authentication
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		const userData = TokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		// const isActivate = userData.payload.isActivated
		// if (!isActivate) {
		// 	return next(ApiError.ForbiddenError())
		// }

		req.user = userData
		next()
	} catch (e) {
		return next(ApiError.UnauthorizedError())
	}
}