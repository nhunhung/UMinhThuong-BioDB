const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Provinces = require('./ProvincesModel');
const Districts = require('./DistrictsModel');
const Wards = sequelize.define('Wards', {
    wards_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});
Districts.hasMany(Wards, { foreignKey: 'districts_id' });
Wards.belongsTo(Districts, { foreignKey: 'districts_id' });
module.exports = Wards;