const User = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocalString()
  const method = req.method
  const url= req.originalURL
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()

}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({ message: "user not found"})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({message: "Problemo finding your user señor"})
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
    if (!name || !name.trim()) {
      res.status(400).json({message: "Post has invalid name"})
    } else {
      req.name = name.trim()
      next()
    }
  };


function validatePost(req, res, next) {
  const id = req.params.id;
  const { text } = req.body;
  Posts.insert(req.body)
  .then( (post) => {
    res.status(201).json(post)
    next()
})
  .catch( () => {
    res.status(400).json({message: "Missing text required field"})
  })
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}