const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/IdentificationModel.js
const sequelize = require('../config/db.config');
const Organism = require('./OrganismModel');
const Sample = require('./SampleModel');



=======

const sequelize = require('../config/connectdb');
const Organism = require('./OrganismModel');
const Sample = require('./SampleModel');
>>>>>>> HUY:src/models/IdentificationModel.js
const Identification = sequelize.define('Identification', {
    identification_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Tình trạng định danh: identificationStatus (String)
    // Tình trạng định danh loài, có thể null, mặc định là 'N/A'
    identificationStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Tài liệu: reference (String)
    // Tài liệu liên quan đến loài, có thể null, mặc định là 'N/A'
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Người định danh: identifier (String)
    // Tên người định danh, có thể null, mặc định là 'N/A'
    identifier: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Người định danh thứ 2: secondIdentifier (String)
    // Tên người định danh thứ hai, có thể null, mặc định là 'N/A'
    secondIdentifier: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },
    // Ngày định danh: identificationDate (Date)
    // Ngày định danh loài, có thể null, mặc định là null
    identificationDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },

    // Tháng định danh: identificationMonth (Integer)
    // Tháng định danh loài, có thể null, mặc định là null
    identificationMonth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },

    // Năm định danh: identificationYear (Integer)
    // Năm định danh loài, có thể null, mặc định là null
    identificationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },

});

Organism.hasMany(Identification, { foreignKey: 'organism_id' });
Identification.belongsTo(Organism, { foreignKey: 'organism_id' });

Sample.hasMany(Identification, { foreignKey: 'sample_id' });
Identification.belongsTo(Sample, { foreignKey: 'sample_id' });

module.exports = Identification;