const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.post('/create', chatController.create);
router.get('/search', chatController.searchChat);
router.get('/:login', chatController.getChatsUser);


module.exports = router;