const router = require('express').Router();
const multer = require('multer');
const pictureController = require('../controllers/picture');
const multerConfig = require('../../config/multer');

router.post("/post", multer(multerConfig).single('file'), pictureController.create);

router.get("/get", pictureController.read);

router.delete("/delete/:id", pictureController.delete);

module.exports = router;