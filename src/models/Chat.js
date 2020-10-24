const mongoose = require('mongoose');
const Mensagem = require('./Mensagem');
const User = require('./User');

const Chat = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  admin: {
    type: User.schema,
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
    type: [User.schema],
    required: true
  },

  messages: [Mensagem.schema],

}, {timestamps: true});

module.exports = mongoose.model('Chat', Chat);