require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres', // Chọn PostgreSQL làm cơ sở dữ liệu
        logging: false, // Disable log SQL
        pool: {
            max: 5, // Max connection
            min: 0, // Min connection
            acquire: 30000,
            idle: 10000, // idle time before closing connection
        },
    }
);

module.exports = sequelize;
