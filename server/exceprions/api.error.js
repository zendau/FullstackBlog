export default class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.message = message
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized user. Access denied.")
  }

  static HttpException(msg) {
    return new ApiError(400, msg)
  }

  static ForbiddenError() {
    return new ApiError(
      403,
      "Forbidden. You do not have permission to access this resource",
    )
  }

  static InternalError(msg) {
    return new ApiError(500, msg)
  }

  static PageNotFoundError(msg) {
    return new ApiError(404, msg)
  }

  static UnexpectedError() {
    return new ApiError(500, "Unexpected error")
  }
}
