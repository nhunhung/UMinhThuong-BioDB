const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const ConservationStatus = sequelize.define('ConservationStatus', {
    conservationstatus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    endangeredLevel: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    redListWorld: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    redListVersion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    vietnamRedBook: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    decree81: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

});

module.exports = ConservationStatus;