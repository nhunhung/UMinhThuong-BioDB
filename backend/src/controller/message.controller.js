const Message = require('../models/MessageModel');
const Users = require('../models/UsersModel'); // Import mô hình người dùng nếu cần để kiểm tra vai trò

// Tạo liên hệ mới
const createContact = async (req, res) => {
    try {
        const { users_id, content } = req.body;

        if (!users_id || !content) {
            return res.status(400).json({ message: 'User ID và nội dung liên hệ là bắt buộc.' });
        }

        const newMessage = await Message.create({
            users_id,
            content,
            sent_date: new Date(),
            status: 'Chưa xử lý',
        });

        return res.status(201).json({
            message: 'Tạo liên hệ thành công.',
            data: newMessage,
        });
    } catch (error) {
        console.error('Error creating contact:', error.message);
        return res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
};

// Cập nhật trạng thái liên hệ
const updateStatus = async (req, res) => {
    try {
        const { messageId, status, userId } = req.body; // Lấy userId từ body request (hoặc từ JWT token)

        // Kiểm tra dữ liệu đầu vào
        if (!messageId || !status || !userId) {
            return res.status(400).json({ message: 'Message ID, trạng thái và userId là bắt buộc.' });
        }

        // Tìm thông tin người dùng
        // const user = await User.findByPk(userId);

        // Lấy thông tin người dùng từ token (đã lưu trong middleware authenticate)
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Kiểm tra nếu người dùng là admin (role_id = 1 hoặc id_admin = 1)
        if (user.role_id !== 1) {  // Giả sử role_id = 1 là admin
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật trạng thái.' });
        }

        // Tìm message theo messageId
        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Không tìm thấy liên hệ.' });
        }

        // Cập nhật trạng thái của message
        message.status = status;
        await message.save();

        return res.status(200).json({
            message: 'Cập nhật trạng thái thành công.',
            data: message,
        });
    } catch (error) {
        console.error('Error updating status:', error.message);
        return res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
};

// Lấy danh sách tin nhắn (chỉ dành cho Admin)
const getMessagesForAdmin = async (req, res) => {
    try {
        // Lấy thông tin user từ middleware authenticate (đã được xác thực)
        const user = req.user;

        // Kiểm tra role của người dùng
        if (user.role_id !== 1) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào danh sách tin nhắn.' });
        }

        // Truy vấn danh sách tin nhắn trong database
        const messages = await Message.findAll({
            include: [{
                model: Users,
                attributes: ['firstname', 'lastname'], // Chỉ lấy các trường cần thiết
            }],
        });

        // Trả về danh sách tin nhắn
        return res.status(200).json({
            message: 'Lấy danh sách tin nhắn thành công.',
            data: messages,
        });
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        return res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
};

// Xóa liên hệ (Chỉ dành cho Admin)
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params; // Lấy messageId từ URL params

        // Kiểm tra xem messageId có tồn tại hay không
        if (!messageId) {
            return res.status(400).json({ message: 'Message ID là bắt buộc.' });
        }

        // Lấy thông tin người dùng từ middleware authenticate
        const user = req.user;

        // Kiểm tra nếu người dùng là admin (role_id = 1)
        if (user.role_id !== 1) {
            return res.status(403).json({ message: 'Bạn không có quyền xóa liên hệ.' });
        }

        // Tìm message theo messageId
        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Không tìm thấy liên hệ.' });
        }

        // Xóa message
        await message.destroy();

        return res.status(200).json({
            message: 'Xóa liên hệ thành công.',
        });
    } catch (error) {
        console.error('Error deleting message:', error.message);
        return res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
};

// Xuất hàm deleteMessage
module.exports = { 
    createContact, 
    updateStatus, 
    getMessagesForAdmin, 
    deleteMessage 
};
