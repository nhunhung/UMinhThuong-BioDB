const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UsersModel');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Tên người dùng và mật khẩu là bắt buộc.' });
        }

        // Tìm người dùng theo username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Tên người dùng không tồn tại.' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
        }

        // Tạo token JWT
        const token = jwt.sign({ userId: user.users_id, role: user.role_id }, 'SECRET_KEY', {
            expiresIn: '1h', // Token hết hạn sau 1 giờ
        });

        return res.status(200).json({
            message: 'Đăng nhập thành công.',
            token,
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
};

module.exports = { login };
