const { DataTypes } = require('sequelize');
const Class = require('./Class');
const sequelize = require('../config/database');

const Orders = sequelize.define('Orders', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'class_id',
        },
    },
});

Class.hasMany(Orders, { foreignKey: 'class_id' });
Orders.belongsTo(Class, { foreignKey: 'class_id' });

module.exports = Orders;
