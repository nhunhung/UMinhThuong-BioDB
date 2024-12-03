const express = require('express');
const { login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route đăng nhập
router.post('/login', login);

// Route yêu cầu bảo vệ, chỉ cho phép truy cập nếu có token hợp lệ
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'User profile',
        user: req.user // Thông tin người dùng từ JWT
    });
});

module.exports = router;
