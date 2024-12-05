const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Kingdom = sequelize.define('Kingdom', {
    kingdom_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kingdom_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});

module.exports = Kingdom;