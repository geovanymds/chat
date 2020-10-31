const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.post('/create', chatController.create);
router.get('/search', chatController.searchChat);
router.post('/enter', chatController.enterChat);
router.post('/send', chatController.send);
router.post('/messages', chatController.getMessages);
router.get('/:login', chatController.getChatsUser);


module.exports = router;