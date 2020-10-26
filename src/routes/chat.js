const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.post('/create', chatController.create);

module.exports = router;