const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');

const Phylum = require('./PhylumModel');
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

},
    {
        tableName: 'Genus',
        timestamps: false
    });
Family.hasMany(Genus, { foreignKey: 'family_id' });
Genus.belongsTo(Family, { foreignKey: 'family_id' });

module.exports = Genus;