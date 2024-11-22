const { DataTypes } = require('sequelize');
const Family = require('./Family');
const sequelize = require('../config/database');

const Genus = sequelize.define('Genus', {
    genus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
    family_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Family,
            key: 'family_id',
        },
    },
});

Family.hasMany(Genus, { foreignKey: 'family_id' });
Genus.belongsTo(Family, { foreignKey: 'family_id' });

module.exports = Genus;
