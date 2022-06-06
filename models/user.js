const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model('User', userSchema);
