const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');

const Phylum = require('./PhylumModel');
const Class = sequelize.define('Class', {
    class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    tableName: 'Class',
    timestamps: false
});
Phylum.hasMany(Class, { foreignKey: 'phylum_id' });
Class.belongsTo(Phylum, { foreignKey: 'phylum_id' });

module.exports = Class;