const { DataTypes } = require('sequelize');
const LocationSample = require('./LocationSample');
const Organism = require('./Organism');
const sequelize = require('../config/database');

const Sample = sequelize.define('Sample', {
    sample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateCollected: DataTypes.TEXT,
    collector: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    locationsample_id: {
        type: DataTypes.INTEGER,
        references: {
            model: LocationSample,
            key: 'locationsample_id',
        },
    },
    organism_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Organism,
            key: 'organism_id',
        },
    },
});

LocationSample.hasMany(Sample, { foreignKey: 'locationsample_id' });
Sample.belongsTo(LocationSample, { foreignKey: 'locationsample_id' });

Organism.hasMany(Sample, { foreignKey: 'organism_id' });
Sample.belongsTo(Organism, { foreignKey: 'organism_id' });

module.exports = Sample;
