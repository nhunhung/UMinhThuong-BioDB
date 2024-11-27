const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Kingdom = require('./KingdomModel');
const Phylum = require('./PhylumModel');

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

});
Orders.hasMany(Family, { foreignKey: 'order_id' });
Family.belongsTo(Orders, { foreignKey: 'order_id' });

module.exports = Family;