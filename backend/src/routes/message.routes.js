const express = require('express');
const routerAPI = express.Router();
const { createContact, updateStatus, getMessagesForAdmin, deleteMessage  } = require('../controller/message.controller');

// POST: Tạo liên hệ
routerAPI.post('/', createContact);

const authenticate = require('../middleware/auth.middleware');
const authorizeRole = require('../middleware/authorizeRole.middleware');
// routerAPI.put('/update-status', authenticate, updateStatus);

// PUT: Cập nhật trạng thái liên hệ (Chỉ Admin)
routerAPI.put('/update-status', authenticate, authorizeRole(1), updateStatus);

// GET: Xem danh sách tin nhắn (Chỉ dành cho Admin)
routerAPI.get('/admin', authenticate, getMessagesForAdmin);

// DELETE: Xóa liên hệ (Chỉ Admin)
routerAPI.delete('/admin/:messageId', authenticate, authorizeRole(1), deleteMessage);

module.exports = routerAPI;
