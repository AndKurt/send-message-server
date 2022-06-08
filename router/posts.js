const router = require('express').Router();
const Post = require('../models/posts');
const User = require('../models/user');

//create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      id: savedPost._id,
      savedPost: savedPost.title,
      recepient: savedPost.recepient,
      sender: savedPost.sender,
      message: savedPost.message,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts for active user
router.get('/', async (req, res) => {
  try {
    const activeUser = await User.findOne({ name: req.body.activeUser });
    const posts = await Post.find({ recepient: activeUser.name });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
