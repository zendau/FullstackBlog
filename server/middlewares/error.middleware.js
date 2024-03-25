import ApiError from "../exceprions/api.error.js"
import Logger from "../libs/logger.js"

// eslint-disable-next-line no-unused-vars
export default function ErrorMiddleware(err, req, res, next) {
  const status = err.status || 500

  if (err instanceof ApiError) {
    Logger.http(err.message)
    return res.status(err.status).json({ status, message: err.message })
  }
  Logger.error(err.message)
  return res.status(500).send({ status, message: "Internal Server Error" })
}
