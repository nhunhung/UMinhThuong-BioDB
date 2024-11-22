const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kingdom = sequelize.define('Kingdom', {
    kingdom_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
});

module.exports = Kingdom;
