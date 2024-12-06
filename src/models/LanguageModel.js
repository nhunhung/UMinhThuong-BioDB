const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/LanguageModel.js
const sequelize = require('../config/db.config');
// const Provinces = require('./ProvincesModel');
// const Districts = require('./DistrictsModel');
=======
const sequelize = require('../config/connectdb');
>>>>>>> HUY:src/models/LanguageModel.js
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