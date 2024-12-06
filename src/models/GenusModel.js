const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/GenusModel.js
const sequelize = require('../config/db.config');
// const Kingdom = require('./KingdomModel');
// const Phylum = require('./PhylumModel');
=======
const sequelize = require('../config/connectdb');

const Phylum = require('./PhylumModel');
>>>>>>> HUY:src/models/GenusModel.js
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

<<<<<<< HEAD:backend/src/models/GenusModel.js
});
=======
},
    {
        tableName: 'Genus',
        timestamps: false
    });
>>>>>>> HUY:src/models/GenusModel.js
Family.hasMany(Genus, { foreignKey: 'family_id' });
Genus.belongsTo(Family, { foreignKey: 'family_id' });

module.exports = Genus;