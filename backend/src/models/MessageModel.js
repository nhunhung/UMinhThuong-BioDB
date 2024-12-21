const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');

const Users = require('./UsersModel');
const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sent_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        allowNull: true,
    },
    status: {
        type: DataTypes.TEXT,
        defaultValue: "sent",  
        allowNull: true,
    },
},
    {
        tableName: 'Message',
        timestamps: false
    });

Users.hasMany(Message, { foreignKey: 'users_id' });
Message.belongsTo(Users, { foreignKey: 'users_id' });

module.exports = Message;
