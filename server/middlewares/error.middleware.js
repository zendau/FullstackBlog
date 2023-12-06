const ApiError = require("../exceprions/api.error")

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  const status = err.status || 500
  const message = err.message || "Unexpected error"

  if (err instanceof ApiError) {
    return res.status(err.status).json({ status, message: err.message })
  }
  console.error(err.stack)
  return res.status(500).send({ status, message })
}
