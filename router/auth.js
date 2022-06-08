const router = require('express').Router();
const User = require('../models/user');

//REGISTER
//router.post('/register', async (req, res) => {
//  //create new user
//  const newUser = new User({
//    sender: req.body.sender,
//  });
//  try {
//    //save user and respond
//    const user = await newUser.save();
//    res.status(200).json(user);
//  } catch (err) {
//    res.status(500).json(err);
//  }
//});

//LOGIN
router.post('/login', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
  });
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      const user = await newUser.save();
      res.status(200).json({ id: user._id, name: user.name });
    } else {
      res.status(200).json({ id: user._id, name: user.name });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
