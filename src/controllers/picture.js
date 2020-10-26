const Picture = require('../models/Picture');
const multer = require('multer');
const multerConfig = require('../../config/multer');

exports.create = async (req, res, next) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const picture = await Picture.create({
    name,
    size,
    key,
    url,
  });

  return res.json(picture);
}