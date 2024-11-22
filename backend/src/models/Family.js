const { DataTypes } = require('sequelize');
const Orders = require('./Orders');
const sequelize = require('../config/database');

const Family = sequelize.define('Family', {
    family_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.TEXT,
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Orders,
            key: 'order_id',
        },
    },
});

Orders.hasMany(Family, { foreignKey: 'order_id' });
Family.belongsTo(Orders, { foreignKey: 'order_id' });

module.exports = Family;
