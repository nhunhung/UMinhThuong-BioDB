const express = require('express');
const path = require("path");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from frontend
    methods: 'GET,POST,PUT,DELETE',  // Allow HTTP methods
    allowedHeaders: 'Content-Type,Authorization'  // Allow these headers
}));

// Import db connection
const db = require("./src/config/database");

// Import routes API
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
const uploadImgRoutes = require('./src/routes/upload_img.routes');

app.use('/api/v1/upload_excel', uploadRoutes);
app.use('/api/v1/upload_img', uploadImgRoutes);

// Config req.body parsing
app.use(express.json()); // for JSON data
app.use(express.urlencoded({ extended: true })); // for form data

// Use body-parser for JSON
app.use(bodyParser.json());



// Middleware for file upload
app.use(fileUpload());

// Serve static files for uploaded content
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

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Test database connection and sync
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync({ force: true }); // Sync database schema (alter: true)
    })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((error) => {
        console.error('Database error:', error.message);
    });

// Start server
const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
