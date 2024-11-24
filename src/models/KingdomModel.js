const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Kingdom = sequelize.define('Kingdom', {
    kingdom_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});

module.exports = Kingdom;