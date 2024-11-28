const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});

module.exports = Role;