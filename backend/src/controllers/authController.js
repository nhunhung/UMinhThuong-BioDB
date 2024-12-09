const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');
const dotenv = require('dotenv');

dotenv.config();

// Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { userId: user.users_id, email: user.email, roleId: user.role_id },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token sẽ hết hạn sau 1 giờ
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.users_id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role_id: user.role_id
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { login };
