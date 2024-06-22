// middleware/validate.middleware.js
import ApiError from "../exceptions/api.error.js"

const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const { error } = schema.validate(req[property])
    if (error) {
      next(ApiError.HttpException(error.details[0].message))
    } else {
      next()
    }
  }

export default validate
