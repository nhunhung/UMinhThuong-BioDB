const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
// const Kingdom = require('./KingdomModel');
// const Phylum = require('./PhylumModel');
const Class = require('./ClassModel');
const Orders = sequelize.define('Orders', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

});
Class.hasMany(Orders, { foreignKey: 'class_id' });
Orders.belongsTo(Class, { foreignKey: 'class_id' });

module.exports = Orders;