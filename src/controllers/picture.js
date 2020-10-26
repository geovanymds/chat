const Picture = require('../models/Picture');
const multer = require('multer');
const multerConfig = require('../../config/multer');

exports.create = async (req, res, next) => {
  const { originalname: name, size, fullname, location: url = "" } = req.file;

  const picture = await Picture.create({
    name,
    size,
    fullname,
    url,
  });

  return res.json(picture);
}

exports.read = async (req, res, next) => {
  const pictures = await Picture.find();

  return res.json(pictures);
}

exports.delete = async (req, res, next) => {
  const picture = await Picture.findById(req.params.id);

  await picture.remove();
  
  return res.send();
}