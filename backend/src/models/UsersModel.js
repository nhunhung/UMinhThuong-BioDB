const { DataTypes } = require('sequelize');
const Role = require('./RoleModel');
const sequelize = require('../config/connectdb');
const Users = sequelize.define('Users', {
    users_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'Users',
    timestamps: false
});
Role.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(Role, { foreignKey: 'role_id' });
module.exports = Users;