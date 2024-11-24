const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Kingdom = require('./KingdomModel');
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

});
Phylum.hasMany(Class, { foreignKey: 'phylum_id' });
Class.belongsTo(Phylum, { foreignKey: 'phylum_id' });

module.exports = Class;