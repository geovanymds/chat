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

Picture.pre('save', function() {
  if (!this.url){
    this.url = `${process.env.APP_URL}/files/${this.fullname}`;
  }
});

module.exports = mongoose.model("Picture", Picture);