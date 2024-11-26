
const hostname = '127.0.0.1';
const express = require('express');
const port = 3001;
const app = express();
const sequelize = require('./config/connectdb');
// require import table
const Role = require('./models/RoleModel');
const Users = require('./models/UsersModel');
const Provinces = require('./models/ProvincesModel');
const Districts = require('./models/DistrictsModel');
const Class = require('./models/ClassModel');
const ConservationStatus = require('./models/ConservationStatusModel');
const Family = require('./models/FamilyModel');
const Genus = require('./models/GenusModel');
const GroupOfOrganisms = require('./models/GroupOfOrganismsModel');
const Kingdom = require('./models/KingdomModel');

const Sample = require('./models/SampleModel');
const LocationSample = require('./models/LocationSampleModel');
const Organism = require('./models/OrganismModel');
const RecordInformation = require('./models/RecordInformationModel');


const Orders = require('./models/OrdersModel');

const Phylum = require('./models/PhylumModel');


const Wards = require('./models/WardsModel');
const Language = require('./models/LanguageModel');
const SearchHistory = require('./models/SearchHistory');
const Message = require('./models/MessageModel');
const FileUpLoad = require('./models/FileUploadModel');
app.get('/', (req, res) => {
    res.send('hello world');
});

(async () => {

    try {
        await sequelize.sync({ force: true }); // Sử dụng `force: true` để xóa và tạo lại bảng, nếu cần
        console.log('Database synchronized!');
    } catch (error) {


        console.error('Error synchronizing the database:', error);
    }
})();
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
