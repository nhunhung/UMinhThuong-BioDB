const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
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

}, {
    tableName: 'Role',
    timestamps: false
});

module.exports = Role;