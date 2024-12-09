const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware kiểm tra token
const authMiddleware = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.headers['authorization']?.split(' ')[1]; // Ví dụ: Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    // Kiểm tra tính hợp lệ của token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Lưu thông tin người dùng vào request để sử dụng trong các route bảo vệ
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
