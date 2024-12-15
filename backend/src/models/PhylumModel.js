const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Kingdom = require('./KingdomModel');
const Phylum = sequelize.define('Phylum', {
    phylum_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phylum_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

}, {
    tableName: 'Phylum',
    timestamps: false
});
Kingdom.hasMany(Phylum, { foreignKey: 'kingdom_id' });
Phylum.belongsTo(Kingdom, { foreignKey: 'kingdom_id' });

module.exports = Phylum;