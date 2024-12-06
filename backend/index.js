const express = require('express');
const dotenv = require('dotenv'); // Sửa cú pháp import dotenv
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();
// const sequelize = require('./src/config/database');

// import routes
const provincesRoutes = require("./src/routes/provinces.routes");

// import message
const messageRoutes = require('./src/routes/message.routes');

// import db connection
const db = require("./src/config/database");

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// API base path
app.use('/api/v1/provinces', provincesRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Tạo đường link để thực hiện tác vụ liên lạc
app.use('/api/v1/contact', messageRoutes);

// // Đưa model của user và role vào
// const Users = require('./src/models/UsersModel');
// const Role = require('./src/models/RoleModel');

// sequelize.sync({ alter: true }) // Sử dụng `alter: true` để cập nhật bảng mà không làm mất dữ liệu
//     .then(() => {
//         console.log('Database synced successfully.');
//     })
//     .catch((err) => {
//         console.error('Error syncing database:', err.message);
//     });

const authRoutes = require('./src/routes/auth.routes'); // Thêm route

// Gắn route đăng nhập
app.use('/api/v1/auth', authRoutes);

// Kiểm tra kết nối và đồng bộ cơ sở dữ liệu
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        // return db.sequelize.sync({ force: false }); // Đồng bộ cơ sở dữ liệu
        return db.sequelize.sync({ alter: true }); // Cập nhật bảng mà không xóa dữ liệu
    })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((error) => {
        console.error('Database error:', error.message);
    });

// Khởi động server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
