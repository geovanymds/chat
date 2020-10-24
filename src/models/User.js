const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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
    select: false,
  },

  status: String,

  likes: [String],
  
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friendship'}]

}, {timestamps: true} );

module.exports = mongoose.model('User', User);