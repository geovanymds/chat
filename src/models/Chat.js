const mongoose = require('mongoose');
const Mensagem = require('./Mensagem');
const User = require('./User');
const userSchema = User.schema;

const Chat = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  admin: {
    type: userSchema,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    required: true
  },

  isPrivate: Boolean,

  password: {
    type: String,
  },
  
  members: {
    type: [userSchema],
    required: true
  },

  messages: [Mensagem],

  created_at:  {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Chat', Chat);