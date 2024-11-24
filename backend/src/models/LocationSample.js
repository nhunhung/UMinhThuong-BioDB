const { DataTypes } = require('sequelize');
const Provinces = require('./Provinces');
const Districts = require('./Districts');
const Wards = require('./Wards');
const sequelize = require('../config/database');

const LocationSample = sequelize.define('LocationSample', {
    locationsample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    latitude: DataTypes.TEXT,
    longitude: DataTypes.TEXT,
    description: DataTypes.TEXT,
    provinces_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Provinces,
            key: 'provinces_id',
        },
    },
    districts_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Districts,
            key: 'districts_id',
        },
    },
    wards_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Wards,
            key: 'wards_id',
        },
    },
});

Provinces.hasMany(LocationSample, { foreignKey: 'provinces_id' });
LocationSample.belongsTo(Provinces, { foreignKey: 'provinces_id' });

Districts.hasMany(LocationSample, { foreignKey: 'districts_id' });
LocationSample.belongsTo(Districts, { foreignKey: 'districts_id' });

Wards.hasMany(LocationSample, { foreignKey: 'wards_id' });
LocationSample.belongsTo(Wards, { foreignKey: 'wards_id' });

module.exports = LocationSample;
