const mongoose = require("mongoose");
const Mensagem = require("./Mensagem");
const User = require("./User");

const Chat = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  
    admin: {
      login: String,
      userName: String,
      unique: false
    },

    description: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    isPrivate: Boolean,

    password: {
      type: String,
    },

    members: {
      type: [
        {
          login: {
            type: String,
            required: true,
          },
          userName: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },

    messages: [Mensagem.schema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", Chat);
