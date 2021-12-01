const Users = require('./../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} request for ${req.url} at ${Date()}`)
  next()
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'Something went really wrong!',
  })
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(potentialUser => {
      if(potentialUser) {
        req.user = potentialUser
        next()
      } else {
        next({
          status: 404,
          message: 'User not found'
        })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  handleError,
  validateUserId,
  validateUser,
}
