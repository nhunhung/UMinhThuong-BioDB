const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
// const Provinces = require('./ProvincesModel');
// const Districts = require('./DistrictsModel');
const Users = require('./UsersModel');
const Language = sequelize.define('Language', {

},
    {
        tableName: 'Language',
        timestamps: false
    });
Users.hasMany(Language, { foreignKey: 'users_id' });
Language.belongsTo(Users, { foreignKey: 'users_id' });
module.exports = Language;