const express = require('express')
const router = express.Router();
const MessageController = require("../controller/MessageController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, MessageController.createMessage);
router.put('/update/:id', authMiddleWare, MessageController.updateMassage);
router.delete('/delete/:id', authMiddleWare, MessageController.deleteMessage);
module.exports = router