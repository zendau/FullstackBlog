const ApiError = require('../exceprions/api.error');

module.exports = function (req, res, next) {
    debugger
    try {
        const isActivate = req.user.payload.isActivated;
        if (!isActivate) {
            return next(ApiError.ForbiddenError());
        }

        next();
    } catch (e) {
        return next(ApiError.ForbiddenError());
    }
}