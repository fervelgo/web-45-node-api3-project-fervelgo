
const router = require('express').Router()

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const  { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

router.get('/', (req, res, next) => {
  Users.get()
    .then(users =>{
      res.json(users)
    })
    .catch(next())  
});

router.get('/:id', validateUserId, (req, res, next) => {
 res.json(req.user)
 
  // await Users.getById(req.params.id)
  //   .then(user => {
  //     res.status(200).json(user)
  //   })
  //   .catch(next())
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then( newUser => {
      res.status(200).json(newUser)
    })
    .catch(next())
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update({ name: req.name })
     //desglosar
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts.insert(req.body)
  });
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

module.exports = router
