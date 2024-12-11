const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const GroupOfOrganisms = sequelize.define('GroupOfOrganisms', {
    groupoforganisms_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    goo_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

},
    {
        tableName: 'GroupOfOrganisms',
        timestamps: false
    });

module.exports = GroupOfOrganisms;