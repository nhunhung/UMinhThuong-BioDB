const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

// Khởi tạo object `db`
const db = {
    sequelize,
    Sequelize: sequelize.constructor,
};

// Import các model 
db.Kingdom = require("../models/KingdomModel");
db.Phylum = require("../models/PhylumModel");
db.Class = require("../models/ClassModel");

db.Districts = require("../models/DistrictsModel");
db.Provinces = require("../models/ProvincesModel");
db.Wards = require("../models/WardsModel");

db.ConservationStatus = require("../models/ConservationStatusModel");
db.Family= require("../models/FamilyModel");
db.FileUpload = require("../models/FileUploadModel");

db.Genus = require("../models/GenusModel");
db.GroupOfOrganisms = require("../models/GroupOfOrganismsModel");
db.Language = require("../models/LanguageModel");

db.LocationSample = require("../models/LocationSampleModel");
db.Message = require("../models/MessageModel");
db.Orders = require("../models/OrdersModel");

db.Organism = require("../models/OrganismModel");
db.RecordInfomation = require("../models/RecordInformationModel");
db.Role = require("../models/RoleModel");

db.Sample = require("../models/SampleModel");
db.SearchHistory = require("../models/SearchHistoryModel");
db.Users = require("../models/UsersModel");

// Thiết lập quan hệ giữa các models nếu có
Object.keys(db).forEach((modelName) => {
    if (db[modelName] && typeof db[modelName].associate === "function") {
        db[modelName].associate(db);
    }
});

module.exports = db;
