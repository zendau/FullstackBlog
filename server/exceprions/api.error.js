module.exports = class ApiError extends Error {

    constructor(status, response) {
        super(response);
        this.status = status;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not auth')
    }

    static HttpException(response) {
        return new ApiError(400, response)
    }

    static ForbiddenError() {
        return new ApiError(403, 'You do not have access to this page');
    }

    static PageNotFoundError(respone) {
        return new ApiError(404, respone)
    }

}