const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {
  handleError,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(400).json(error)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body
  Users.update(req.user.id, changes)
    .then(updateUser => {
      res.status(201).json(updateUser)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id).then((record) => {
    res.json(req.user)
  })
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(handleError)

// do not forget to export the router
module.exports = router
