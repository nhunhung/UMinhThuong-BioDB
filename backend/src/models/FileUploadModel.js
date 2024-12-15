const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Provinces = require('./ProvincesModel');
const Districts = require('./DistrictsModel');
const Users = require('./UsersModel');
const FileUpLoad = sequelize.define('FileUpload', {
    fileupload_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    upload_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        tableName: 'FileUpload',
        timestamps: false
    });
Users.hasMany(FileUpLoad, { foreignKey: 'users_id' });
FileUpLoad.belongsTo(Users, { foreignKey: 'users_id' });
module.exports = FileUpLoad;