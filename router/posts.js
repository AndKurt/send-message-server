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
    const activeUser = await User.findOne({ name: req.query.activeUser });
    const posts = await Post.find({ recepient: activeUser.name });
    const data = [];
    posts.forEach((post) =>
      data.push({
        id: post._id,
        title: post.title,
        recepient: post.recepient,
        sender: post.sender,
        message: post.message,
      })
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
