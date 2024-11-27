const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Provinces = require('./ProvincesModel');
const Districts = require('./DistrictsModel');
const Wards = require('./WardsModel');
// const Sample = require('./SampleModel');
// const Organism = require('./OrganismModel');


const LocationSample = sequelize.define('LocationSample', {
    locationsample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// Associations with Provinces, Districts, and Wards
Provinces.hasMany(LocationSample, { foreignKey: 'provinces_id' });
LocationSample.belongsTo(Provinces, { foreignKey: 'provinces_id' });

Districts.hasMany(LocationSample, { foreignKey: 'districts_id' });
LocationSample.belongsTo(Districts, { foreignKey: 'districts_id' });

Wards.hasMany(LocationSample, { foreignKey: 'wards_id' });
LocationSample.belongsTo(Wards, { foreignKey: 'wards_id' });


module.exports = LocationSample;
// LocationSample.belongsToMany(Organism, {
//     through: Sample,
//     foreignKey: 'locationsample_id',
// });

// LocationSample.belongsToMany(Organism, {
//     through: Sample,
//     foreignKey: 'locationsample_id',
// });
// Organism.belongsToMany(LocationSample, {
//     through: Sample,
//     foreignKey: 'organism_id',
// });



// LocationSample.belongsToMany(Sample, {
//     through: 'likedTootsLikers',
//     foreignKey: 'locationsample_id',
// });


// LocationSample.belongsToMany(Sample, {
//     through: 'likedTootsLikers',
//     foreignKey: 'locationsample_id',
// });
// Sample.belongsToMany(LocationSample, {
//     through: 'likedTootsLikers',
//     foreignKey: 'sample_id',
// });