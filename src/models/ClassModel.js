const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/ClassModel.js
const sequelize = require('../config/db.config');
=======
const sequelize = require('../config/connectdb');

>>>>>>> HUY:src/models/ClassModel.js
const Phylum = require('./PhylumModel');
const Class = sequelize.define('Class', {
    class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

<<<<<<< HEAD:backend/src/models/ClassModel.js
=======
}, {
    tableName: 'Class',
    timestamps: false
>>>>>>> HUY:src/models/ClassModel.js
});
Phylum.hasMany(Class, { foreignKey: 'phylum_id' });
Class.belongsTo(Phylum, { foreignKey: 'phylum_id' });

module.exports = Class;