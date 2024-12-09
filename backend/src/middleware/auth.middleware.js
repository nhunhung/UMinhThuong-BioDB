const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', ''); // Lấy token từ header

    if (!token) {
        return res.status(401).json({ message: 'Không có quyền truy cập.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Xác thực token với secret key
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }
        req.user = user; // Lưu user vào request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};

module.exports = authenticate;
