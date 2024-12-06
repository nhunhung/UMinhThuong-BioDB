const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/KingdomModel.js
const sequelize = require('../config/db.config');
=======
const sequelize = require('../config/connectdb');
>>>>>>> HUY:src/models/KingdomModel.js
const Kingdom = sequelize.define('Kingdom', {
    kingdom_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

<<<<<<< HEAD:backend/src/models/KingdomModel.js
});
=======
},
    {
        tableName: 'Kingdom',
        timestamps: false
    });
>>>>>>> HUY:src/models/KingdomModel.js

module.exports = Kingdom;