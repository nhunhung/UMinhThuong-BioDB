const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Orders = require('./OrdersModel');
const Family = sequelize.define('Family', {
    family_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

},
    {
        tableName: 'Family',
        timestamps: false
    });
Orders.hasMany(Family, { foreignKey: 'order_id' });
Family.belongsTo(Orders, { foreignKey: 'order_id' });

module.exports = Family;