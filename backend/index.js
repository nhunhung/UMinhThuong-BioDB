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
