const router = require('express').Router();
const multer = require('multer');
const userController = require('../controllers/picture');
const multerConfig = require('../../config/multer');

router.post("/post", multer(multerConfig).single('file'), userController.create);

module.exports = router;