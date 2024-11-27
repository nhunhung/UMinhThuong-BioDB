const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Provinces = sequelize.define('Provinces', {
    provinces_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});

module.exports = Provinces;