const ApiError = require('../exceprions/api.error');

module.exports = function (err, req, res, next) {
    console.log(err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    debugger
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Unexpected error'})

};