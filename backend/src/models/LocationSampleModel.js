const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Provinces = require('./ProvincesModel');
const Districts = require('./DistrictsModel');
const Wards = require('./WardsModel');
require('events').setMaxListeners(20);
const LocationSample = sequelize.define('LocationSample', {
    locationsample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Việt Nam',
    },
    collectionVillage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Địa danh: location (String) - Mặc định là 'VQG U Minh Thượng'
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'VQG U Minh Thượng',
    },
    // Ghi chú về địa điểm ghi mẫu: locationNotes (String) - Ghi chú về địa điểm
    locationNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Vĩ độ: latitude (Float)
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    // Bắc/Nam: northSouth (String)
    northSouth: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Kinh độ: longitude (Float)
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    // Đông/Tây: eastWest (String)
    eastWest: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Độ Cao: elevation (Float)
    elevation: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    // Độ cao cao nhất loài phân bố: maxElevationRange (Float)
    maxElevationRange: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    // Đơn vị độ cao: elevationUnit (String)
    elevationUnit: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'm',
    },
    // Kinh độ VN2000: vn2000Longitude (Float)
    vn2000Longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    // Vĩ độ VN2000: vn2000Latitude (Float)
    vn2000Latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },

}, {
    tableName: 'LocationSample',
    timestamps: false
});
Provinces.hasMany(LocationSample, { foreignKey: 'provinces_id' });
LocationSample.belongsTo(Provinces, { foreignKey: 'provinces_id' });

Districts.hasMany(LocationSample, { foreignKey: 'districts_id' });
LocationSample.belongsTo(Districts, { foreignKey: 'districts_id' });

Wards.hasMany(LocationSample, { foreignKey: 'wards_id' });
LocationSample.belongsTo(Wards, { foreignKey: 'wards_id' });
module.exports = LocationSample;