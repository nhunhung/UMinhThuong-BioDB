const { DataTypes } = require('sequelize');
const Phylum = require('./Phylum');
const sequelize = require('../config/database');

const Class = sequelize.define('Class', {
    class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
    phylum_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Phylum,
            key: 'phylum_id',
        },
    },
});

Phylum.hasMany(Class, { foreignKey: 'phylum_id' });
Class.belongsTo(Phylum, { foreignKey: 'phylum_id' });

module.exports = Class;
