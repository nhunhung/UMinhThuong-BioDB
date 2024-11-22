const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConservationStatus = sequelize.define('ConservationStatus', {
    conservationstatus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    endangeredLevel: DataTypes.TEXT,
    redListWorld: DataTypes.TEXT,
    redListVersion: DataTypes.TEXT,
    vietnamRedBook: DataTypes.TEXT,
    decree81: DataTypes.TEXT,
});

module.exports = ConservationStatus;
