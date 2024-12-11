const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');

const Districts = require('./DistrictsModel');
const Wards = sequelize.define('Wards', {
    wards_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ward_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    tableName: 'Wards',
    timestamps: false
});
Districts.hasMany(Wards, { foreignKey: 'districts_id' });
Wards.belongsTo(Districts, { foreignKey: 'districts_id' });
module.exports = Wards;