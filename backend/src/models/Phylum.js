const { DataTypes } = require('sequelize');
const Kingdom = require('./Kingdom');
const sequelize = require('../config/database');

const Phylum = sequelize.define('Phylum', {
    phylum_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
    kingdom_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Kingdom,
            key: 'kingdom_id',
        },
    },
});

Kingdom.hasMany(Phylum, { foreignKey: 'kingdom_id' });
Phylum.belongsTo(Kingdom, { foreignKey: 'kingdom_id' });

module.exports = Phylum;
