const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
// const Kingdom = require('./KingdomModel');
// const Phylum = require('./PhylumModel');
const Family = require('./FamilyModel');
const Genus = sequelize.define('Genus', {
    genus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});
Family.hasMany(Genus, { foreignKey: 'family_id' });
Genus.belongsTo(Family, { foreignKey: 'family_id' });

module.exports = Genus;