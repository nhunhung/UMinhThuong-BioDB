const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecordInformation = sequelize.define('RecordInformation', {
    recordinformation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    recorded: DataTypes.TEXT,
    recordID1: DataTypes.TEXT,
    recordType: DataTypes.TEXT,
    sampleQuantity: DataTypes.TEXT,
    recordDate: DataTypes.DATE,
    projectNameRelatedtoTheSample: DataTypes.INTEGER,
});

module.exports = RecordInformation;
