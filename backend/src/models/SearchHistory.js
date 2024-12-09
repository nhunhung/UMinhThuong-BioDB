const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Users = require('./UsersModel');
const SearchHistory = sequelize.define('SearchHistory', {

},
    {
        tableName: 'SearchHistory',
        timestamps: false
    });
Users.hasMany(SearchHistory, { foreignKey: 'users_id' });
SearchHistory.belongsTo(Users, { foreignKey: 'users_id' });
module.exports = SearchHistory;