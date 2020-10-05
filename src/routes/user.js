const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:userName', userController.getUser);
router.get('/', userController.getUsers);
router.post('/friendshipReq', userController.friendshipRequest);
router.post('/friendshipRes/', userController.friendshipResponse);

module.exports = router;