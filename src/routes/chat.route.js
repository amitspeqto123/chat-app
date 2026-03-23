const express = require('express');
const { chatList, messageList } = require('../controllers/chat.controller');
const { isAuthentication } = require('../middlewares/jwt');

const router = express.Router();

router.get("/all", isAuthentication, chatList);
router.get("/:conversationId", messageList);
router.post("/:conversationId/image")
module.exports = router;