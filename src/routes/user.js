const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userValidation = require('../helper/userValidation');

router.post('/signup', userValidation, userController.signup);
router.post('/login', userController.login);
router.get('/:login', userController.getUser);
router.get('/', userController.getUsers);
router.post('/friendshipReq', userController.friendshipRequest);
router.post('/friendshipRes/', userController.friendshipResponse);

module.exports = router;