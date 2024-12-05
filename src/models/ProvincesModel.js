const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
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

},
    {
        tableName: 'Provinces',
        timestamps: false
    });

module.exports = Provinces;