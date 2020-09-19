const mongoose = require('mongoose');

const User = new mongoose.Schema({

  login: {
    type: String,
    required: true,
    unique: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  created_at:  {
    type: Date,
    default: Date.now
  },

  status: String,

  likes: [String],
  
  friends: [Number]

});

module.exports = mongoose.model('User', User);