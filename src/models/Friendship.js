const mongoose = require("mongoose");

const Friendship = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: Number,
      enums: [
        1, //'add friend'
        2, //'pending'
        3, //'friends
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friendship", Friendship);
