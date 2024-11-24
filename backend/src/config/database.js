require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize
const sequelize = new Sequelize(
    process.env.database, 
    process.env.user, 
    process.env.password, 
    {
        host: 'localhost',
        dialect: 'postgres', // Chọn PostgreSQL làm cơ sở dữ liệu
    }
);

(async () => {
    try {
        // Kiểm tra kết nối
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

module.exports = sequelize;
 