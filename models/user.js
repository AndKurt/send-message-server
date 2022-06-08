const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model('User', userSchema);
