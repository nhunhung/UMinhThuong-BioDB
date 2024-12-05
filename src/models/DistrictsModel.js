const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Provinces = require('./ProvincesModel');
const Districts = sequelize.define('Districts', {
    districts_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    tableName: 'Districts',
    timestamps: false
});
Provinces.hasMany(Districts, { foreignKey: 'provinces_id' });
Districts.belongsTo(Provinces, { foreignKey: 'provinces_id' });
module.exports = Districts;