module.exports = class ApiError extends Error {

  constructor(status, response) {
    super(response)
    this.status = status
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Unauthorized user. Access denied.')
  }

  static HttpException(response) {
    return new ApiError(400, response)
  }



  static ForbiddenError() {
    return new ApiError(403, 'Forbidden. You do not have permission to access this resource')
  }

  static PageNotFoundError(respone) {
    return new ApiError(404, respone)
  }

}