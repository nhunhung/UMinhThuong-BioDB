const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const hostname = process.env.HOST || '127.0.0.1'; // Đảm bảo giá trị mặc định hợp lệ
const port = process.env.PORT || 3000;
const app = express();
const sequelize = require('./src/config/db.config'); // Đường dẫn đúng cho sequelize config

// Import models để đảm bảo chúng được đăng ký với Sequelize
require('./src/models/OrganismModel');
require('./src/models/LocationSampleModel');

// Import routes
const mapRoutes = require('./src/routes/map');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', mapRoutes);

app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Kiểm tra kết nối DB và đồng bộ
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync({ force: false }); // Không xóa bảng nếu đã tồn tại
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Database error:', error.message);
    }
})();

// Khởi động server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
