import ApiError from "../exceprions/api.error.js"

// eslint-disable-next-line no-unused-vars
export default function (err, req, res, next) {
  const status = err.status || 500
  const message = err.message || "Unexpected error"

  if (err instanceof ApiError) {
    return res.status(err.status).json({ status, message: err.message })
  }
  console.error(err.stack)
  return res.status(500).send({ status, message })
}
