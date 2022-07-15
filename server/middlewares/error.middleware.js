const ApiError = require('../exceprions/api.error')

module.exports = function (err, req, res, next) {
  debugger
  if (err instanceof ApiError) {
    return res.status(err.status).send(err.message)
  }
  return res.status(500).send('Unexpected error')

}