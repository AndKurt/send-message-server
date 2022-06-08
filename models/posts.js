const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
  },
  recepient: {
    type: String,
    required: true,
    min: 1,
  },
  sender: {
    type: String,
    required: true,
    min: 1,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
