const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const GroupOfOrganisms = sequelize.define('GroupOfOrganisms', {
    groupoforganisms_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});

module.exports = GroupOfOrganisms;