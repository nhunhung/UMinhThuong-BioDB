const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/DistrictsModel.js
const sequelize = require('../config/db.config');
=======
const sequelize = require('../config/connectdb');
>>>>>>> HUY:src/models/DistrictsModel.js
const Provinces = require('./ProvincesModel');
const Districts = sequelize.define('Districts', {
    districts_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

<<<<<<< HEAD:backend/src/models/DistrictsModel.js
=======
}, {
    tableName: 'Districts',
    timestamps: false
>>>>>>> HUY:src/models/DistrictsModel.js
});
Provinces.hasMany(Districts, { foreignKey: 'provinces_id' });
Districts.belongsTo(Provinces, { foreignKey: 'provinces_id' });
module.exports = Districts;