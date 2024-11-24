const hostname = '127.0.0.1';
const express = require('express');
const port = 3001;
const app = express();
const sequelize = require('./src/config/database');

// Import all models
const Role = require('./src/models/Role');
const Users = require('./src/models/User');
const Provinces = require('./src/models/Provinces');
const Districts = require('./src/models/Districts');
const Wards = require('./src/models/Wards');
const LocationSample = require('./src/models/LocationSample');
const ConservationStatus = require('./src/models/ConservationStatus');
const GroupOfOrganisms = require('./src/models/GroupOfOrganisms');
const RecordInformation = require('./src/models/RecordInformation');
const Kingdom = require('./src/models/Kingdom');
const Phylum = require('./src/models/Phylum');
const Class = require('./src/models/Class');
const Orders = require('./src/models/Orders');
const Family = require('./src/models/Family');
const Genus = require('./src/models/Genus');
const Organism = require('./src/models/Organism');
const Sample = require('./src/models/Sample');

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

// Initialize the database
(async () => {
    try {
        // Sync all models with the database
        await sequelize.sync({ force: true }); // Set `force: true` to recreate tables each time
        console.log('Database synchronized successfully!');

        // Add sample data if needed
        await Role.create({ name: 'Admin' });
        console.log('Sample data added to the database!');
    } catch (error) {
        console.error('Error during database initialization:', error);
    }
})();

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
