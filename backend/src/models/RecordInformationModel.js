const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
// const Provinces = require('./ProvincesModel');
// const Districts = require('./DistrictsModel');
// const Organism = require('./OrganismModel');
const RecordInformation = sequelize.define('RecordInformation', {
    recordinformation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    recorded: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recordId1: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recordType: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sampleQuantity: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recordDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    projectNameRelatedtoTheSample: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
    {
        tableName: 'RecordInformation',
        timestamps: false
    }

);
// // RecordInformation.hasOne(Organism, { foreignKey: 'recordinformation_id' });
// RecordInformation.hasOne(Organism, { foreignKey: 'recordinformation_id', as: 'organism' });
// Organism.belongsTo(RecordInformation, { foreignKey: 'recordinformation_id', as: 'recordInformation' });
module.exports = RecordInformation;