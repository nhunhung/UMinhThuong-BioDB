const { DataTypes } = require('sequelize');
const Provinces = require('./Provinces');
const sequelize = require('../config/database');

const Districts = sequelize.define('Districts', {
    districts_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    provinces_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Provinces,
            key: 'provinces_id',
        },
    },
});

Provinces.hasMany(Districts, { foreignKey: 'provinces_id' });
Districts.belongsTo(Provinces, { foreignKey: 'provinces_id' });

module.exports = Districts;
