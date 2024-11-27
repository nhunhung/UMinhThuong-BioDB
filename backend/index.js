const express = require('express');
const dotenv = require('dotenv'); // Sửa cú pháp import dotenv
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();
// const sequelize = require('./src/config/database');

// import routes
const provincesRoutes = require("./src/routes/provinces.routes");

// import db connection
const db = require("./src/config/database");

// // Import all models
// const Role = require('./src/models/Role');
// const Users = require('./src/models/User');
// const Provinces = require('./src/models/Provinces');
// const Districts = require('./src/models/DistrictsModel');
// const Wards = require('./src/models/Wards');
// const LocationSample = require('./src/models/LocationSample');
// const ConservationStatus = require('./src/models/ConservationStatus');
// const GroupOfOrganisms = require('./src/models/GroupOfOrganisms');
// const RecordInformation = require('./src/models/RecordInformation');
// const Kingdom = require('./src/models/Kingdom');
// const Phylum = require('./src/models/Phylum');
// const Class = require('./src/models/Class');
// const Orders = require('./src/models/Orders');
// const Family = require('./src/models/Family');
// const Genus = require('./src/models/Genus');
// const Organism = require('./src/models/Organism');
// const Sample = require('./src/models/Sample');

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// API base path
app.use('/api/v1/provinces', provincesRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Kiểm tra kết nối cơ sở dữ liệu
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
    });

// Đồng bộ cơ sở dữ liệu (Tùy chọn: Bạn có thể dùng `sync()` để tạo/đồng bộ các bảng trong cơ sở dữ liệu)
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced successfully.");
});
// // Initialize the database
// (async () => {
//     try {
//         // Sync all models with the database
//         await sequelize.sync({ alter: true }); // Set `force: true` to recreate tables each time
//         console.log('Database synchronized successfully!');

//         // Add sample data if needed
//         await Role.create({ name: 'Admin' });
//         console.log('Sample data added to the database!');
//     } catch (error) {
//         console.error('Error during database initialization:', error);
//     }
// })();

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
