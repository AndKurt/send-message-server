const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('Something went wrong!');
      next();
    }

    const data = [];
    users.forEach((user) =>
      data.push({
        id: user._id,
        name: user.name,
      })
    );
    res.status(200).json(data);
  });
});

module.exports = router;
