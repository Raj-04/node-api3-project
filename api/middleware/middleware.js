const Users = require('./../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} request for ${req.url} at ${Date()}`)
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
}
