const { DataTypes } = require('sequelize');
const Districts = require('./Districts');
const sequelize = require('../config/database');

const Wards = sequelize.define('Wards', {
    wards_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    districts_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Districts,
            key: 'districts_id',
        },
    },
});

Districts.hasMany(Wards, { foreignKey: 'districts_id' });
Wards.belongsTo(Districts, { foreignKey: 'districts_id' });

module.exports = Wards;
