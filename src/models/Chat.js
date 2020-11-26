const mongoose = require('mongoose');
const Mensagem = require('./Mensagem');
const User = require('./User');

const UserSchema = new mongoose.Schema({

  avatarUrl: {
    type: String
  },

  login: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

});

const Chat = new mongoose.Schema({

  avatarUrl: {
    type: String
  },

  name: {
    type: String,
    required: true
  },

  admin: {
    type: UserSchema,
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
    type: [UserSchema],
    required: true
  },
  messages: [Mensagem.schema],

  totalMessages: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('Chat', Chat);
