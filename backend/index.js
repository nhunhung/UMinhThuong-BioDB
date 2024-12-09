const express = require('express');
const dotenv = require('dotenv'); // Sửa cú pháp import dotenv
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();
// const sequelize = require('./src/config/database');

// import routes
const provincesRoutes = require("./src/routes/provinces.routes");
const authRoutes = require("./src/routes/auth");

// import db connection
const db = require("./src/config/database");

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// API base path
app.use('/api/v1/provinces', provincesRoutes);
app.use('/api/v1/auth', authRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Kiểm tra kết nối và đồng bộ cơ sở dữ liệu
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync({ force: false }); // Đồng bộ cơ sở dữ liệu
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
