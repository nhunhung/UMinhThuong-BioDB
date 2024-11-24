const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Kingdom = require('./KingdomModel');
const Phylum = require('./PhylumModel');
const Class = require('./ClassModel');
const RecordInformation = require('./RecordInformationModel');
const GroupOfOrganisms = require('./GroupOfOrganismsModel');
const ConservationStatus = require('./ConservationStatusModel');
const Family = require('./FamilyModel');
const Genus = require('./GenusModel');

const Orders = require('./OrdersModel');
const Sample = require('./SampleModel');
const LocationSample = require('./LocationSampleModel');


const Organism = sequelize.define('Organism', {
    organism_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    scientificName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    commonName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    avatarText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },



},
    {
        tableName: 'Organism',
        timestamps: false
    });



ConservationStatus.hasMany(Organism, { foreignKey: 'conservationstatus_id' });
Organism.belongsTo(ConservationStatus, { foreignKey: 'conservationstatus_id' });

GroupOfOrganisms.hasMany(Organism, { foreignKey: 'groupoforganisms_id' });
Organism.belongsTo(GroupOfOrganisms, { foreignKey: 'groupoforganisms_id' });




RecordInformation.hasMany(Organism, { foreignKey: 'recordinformation_id' });
Organism.belongsTo(RecordInformation, { foreignKey: 'recordinformation_id' });

Kingdom.hasMany(Organism, { foreignKey: 'kingdom_id' });
Organism.belongsTo(Kingdom, { foreignKey: 'kingdom_id' });

Phylum.hasMany(Organism, { foreignKey: 'phylum_id' });
Organism.belongsTo(Phylum, { foreignKey: 'phylum_id' });

Class.hasMany(Organism, { foreignKey: 'class_id' });
Organism.belongsTo(Class, { foreignKey: 'class_id' });

Orders.hasMany(Organism, { foreignKey: 'order_id' });
Organism.belongsTo(Orders, { foreignKey: 'order_id' });

Family.hasMany(Organism, { foreignKey: 'family_id' });
Organism.belongsTo(Family, { foreignKey: 'family_id' });

Genus.hasMany(Organism, { foreignKey: 'genus_id' });
Organism.belongsTo(Genus, { foreignKey: 'genus_id' });



module.exports = Organism;
// LocationSample.belongsToMany(Organism, {
//     through: Sample,
//     foreignKey: 'locationsample_id',
// });

// Organism.belongsToMany(Sample, {
//     through: 'likersLikedToots',
//     foreignKey: 'organism_id',
// });


// Sample.belongsToMany(Organism, {
//     through: 'likersLikedToots',
//     foreignKey: 'sample_id',
// });

// Organism.belongsToMany(LocationSample, {
//     through: Sample,
//     foreignKey: 'organism_id',
// });


// Organism.belongsToMany(Sample, {
//     through: 'likersLikedToots',
//     foreignKey: 'organism_id',
// });

// Organism.belongsToMany(LocationSample, {
//     through: Sample,
//     foreignKey: 'organism_id',
// });
// Organism.belongsToMany(LocationSample, {
//     through: Sample,
//     foreignKey: 'organism_id',
// });
// LocationSample.belongsToMany(Organism, {
//     through: Sample,
//     foreignKey: 'locationsample_id',
// });

