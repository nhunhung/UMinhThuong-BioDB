const { DataTypes } = require('sequelize');
const Role = require('./RoleModel');
const sequelize = require('../config/db.config');
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
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'role_id',
        },
    }
});
Role.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(Role, { foreignKey: 'role_id' });
module.exports = Users;