const express = require('express');
const path = require("path");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();

// import db connection
const db = require("./src/config/database");

// import routes API
const provincesRoutes = require("./src/routes/provinces.routes");
const districtsRoutes = require("./src/routes/districts.routes");
const wardsRoutes = require("./src/routes/wards.routes");
const locationSamplesRoutes = require("./src/routes/location_samples.routes");
const sampleRoutes = require("./src/routes/sample.routes");
const conservationStatusRoutes = require("./src/routes/conservation_status.routes");
const groupOfOrganismsRoutes = require("./src/routes/group_of_organisms.routes");
const identificationRoutes = require("./src/routes/identification.routes");
const kingdomRoutes = require("./src/routes/kingdom.routes");
const genusRoutes = require("./src/routes/genus.routes");
const familiesRoutes = require("./src/routes/families.routes");
const ordersRoutes = require("./src/routes/orders.routes");
const classesRoutes = require("./src/routes/classes.routes");
const phylumsRoutes = require("./src/routes/phylums.routes");
const organismsRoutes = require("./src/routes/organisms.routes");
const uploadRoutes = require('./src/routes/upload_file.routes');
app.use('/api/v1/upload_excel', uploadRoutes);

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware file-upload
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "./src/public/uploads")));

// API base path
app.use('/api/v1/provinces', provincesRoutes);
app.use('/api/v1/districts', districtsRoutes);
app.use('/api/v1/wards', wardsRoutes);
app.use('/api/v1/location_samples', locationSamplesRoutes);
app.use('/api/v1/sample', sampleRoutes);
app.use('/api/v1/conservation_status', conservationStatusRoutes);
app.use('/api/v1/group_of_organisms', groupOfOrganismsRoutes);
app.use('/api/v1/identification', identificationRoutes);
app.use('/api/v1/kingdom', kingdomRoutes);
app.use('/api/v1/genus', genusRoutes);
app.use('/api/v1/families', familiesRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/classes', classesRoutes);
app.use('/api/v1/phylums', phylumsRoutes);
app.use('/api/v1/organisms', organismsRoutes);
// app.use('/api/v1/upload_excel', uploadExcelRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Kiểm tra kết nối và đồng bộ cơ sở dữ liệu
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync({ force: true }); // Đồng bộ cơ sở dữ liệu //force: true | dev // alter: true | sync
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
