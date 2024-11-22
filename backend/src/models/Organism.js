const { DataTypes } = require('sequelize');
const RecordInformation = require('./RecordInformation');
const GroupOfOrganisms = require('./GroupOfOrganisms');
const ConservationStatus = require('./ConservationStatus');
const Kingdom = require('./Kingdom');
const Phylum = require('./Phylum');
const Class = require('./Class');
const Orders = require('./Orders');
const Family = require('./Family');
const Genus = require('./Genus');
const sequelize = require('../config/database');

const Organism = sequelize.define('Organism', {
    organism_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    scientificName: DataTypes.TEXT,
    commonName: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    recordinformation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: RecordInformation,
            key: 'recordinformation_id',
        },
    },
    groupoforganisms_id: {
        type: DataTypes.INTEGER,
        references: {
            model: GroupOfOrganisms,
            key: 'groupoforganisms_id',
        },
    },
    conservationstatus_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ConservationStatus,
            key: 'conservationstatus_id',
        },
    },
    kingdom_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Kingdom,
            key: 'kingdom_id',
        },
    },
    phylum_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Phylum,
            key: 'phylum_id',
        },
    },
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'class_id',
        },
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Orders,
            key: 'order_id',
        },
    },
    family_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Family,
            key: 'family_id',
        },
    },
    genus_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Genus,
            key: 'genus_id',
        },
    },
});

module.exports = Organism;
