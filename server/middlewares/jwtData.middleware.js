const ApiError = require("../exceprions/api.error");
const TokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next();
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next();
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next();
  }
};
