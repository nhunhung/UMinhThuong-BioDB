// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connectdb');
// const Kingdom = require('./KingdomModel');
// const LocationSample = require('./LocationSampleModel');
// const Organism = require('./OrganismModel');
// const Sample = sequelize.define('Sample', {
//     sample_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     dateCollected: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     collector: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     notes: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     }

// });
// LocationSample.hasMany(Sample, { foreignKey: 'locationsample_id' });
// Sample.belongsTo(LocationSample, { foreignKey: 'locationsample_id' });

// Organism.hasMany(Sample, { foreignKey: 'organism_id' });
// Sample.belongsTo(Organism, { foreignKey: 'organism_id' });

// Sample.belongsToMany(LocationSample, {
//     through: 'SampleLocation',
//     foreignKey: 'sample_id',
// });
// Sample.belongsToMany(Organism, {
//     through: 'SampleOrganism',
//     foreignKey: 'sample_id',
// });
// module.exports = Sample;

// SampleModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Organism = require('./OrganismModel');
const LocationSample = require('./LocationSampleModel');
// const LocationSample = require('./LocationSampleModel')
// const Organism = require('./OrganismModel');

const Sample = sequelize.define('Sample', {
    sample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateCollected: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    collector: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
LocationSample.belongsToMany(Organism, {
    through: Sample,
    foreignKey: 'locationsample_id',
});
Organism.belongsToMany(LocationSample, {
    through: Sample,
    foreignKey: 'organism_id',
});
module.exports = Sample;

// Sample.belongsToMany(LocationSample, {
//     through: 'likedTootsLikers',
//     foreignKey: 'sample_id',
// });
// LocationSample.belongsToMany(Sample, {
//     through: 'likedTootsLikers',
//     foreignKey: 'locationsample_id',
// });

// // Quan hệ n-n giữa Sample và Organism qua bảng trung gian likersLikedToots
// Sample.belongsToMany(Organism, {
//     through: 'likersLikedToots',
//     foreignKey: 'sample_id',
// });
// Organism.belongsToMany(Sample, {
//     through: 'likersLikedToots',
//     foreignKey: 'organism_id',
// });

// LocationSample.hasMany(Sample, { foreignKey: 'locationsample_id' });
// Sample.belongsTo(LocationSample, { foreignKey: 'locationsample_id' });

// Organism.hasMany(Sample, { foreignKey: 'organism_id' });
// Sample.belongsTo(Organism, { foreignKey: 'organism_id' });

// // Quan hệ n-n qua bảng trung gian

// Sample.belongsToMany(LocationSample, {
//     through: Sample,
//     foreignKey: 'sample_id',
// });
// Sample.belongsToMany(Organism, {
//     through: Sample,
//     foreignKey: 'sample_id',
// });


