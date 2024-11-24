const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GroupOfOrganisms = sequelize.define('GroupOfOrganisms', {
    groupoforganisms_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    logo: DataTypes.TEXT,
    name: DataTypes.TEXT,
});

module.exports = GroupOfOrganisms;
