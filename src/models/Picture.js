const mongoose = require('mongoose');

const Picture = new mongoose.Schema({
  name: String,
  size: Number,
  fullname: String,
  url:String,
  createdAt:{
    type: Date,
    default:  Date.now
  }
});

module.exports = mongoose.model("Picture", Picture);