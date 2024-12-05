const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Provinces = require('./ProvincesModel');
const Districts = sequelize.define('Districts', {
    districts_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    district_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});
Provinces.hasMany(Districts, { foreignKey: 'provinces_id' });
Districts.belongsTo(Provinces, { foreignKey: 'provinces_id' });
module.exports = Districts;