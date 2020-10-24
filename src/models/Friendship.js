const mongoose = require("mongoose");
const User = require("../models/User");

const Friendship = new mongoose.Schema(
  {
    requester: User.schema,
    recipient: User.schema,
    status: {
      type: Number,
      status: [
        1, //'add friend'
        2, //'pending'
        3, //'friends
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Friendship', Friendship);
