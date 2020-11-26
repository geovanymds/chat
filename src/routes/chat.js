const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.post('/create', chatController.create);
router.get('/search', chatController.searchChat);
router.post('/enter', chatController.enterChat);
router.post('/send', chatController.send);
router.get('/messages', chatController.getMessages);
router.get('/chat/:id', chatController.getChat);
router.get('/user/:login', chatController.getChatsUser);


module.exports = router;