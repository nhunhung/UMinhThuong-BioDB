const { DataTypes } = require('sequelize');
<<<<<<< HEAD:backend/src/models/GroupOfOrganismsModel.js
const sequelize = require('../config/db.config');
=======
const sequelize = require('../config/connectdb');
>>>>>>> HUY:src/models/GroupOfOrganismsModel.js
const GroupOfOrganisms = sequelize.define('GroupOfOrganisms', {
    groupoforganisms_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

<<<<<<< HEAD:backend/src/models/GroupOfOrganismsModel.js
});
=======
},
    {
        tableName: 'GroupOfOrganisms',
        timestamps: false
    });
>>>>>>> HUY:src/models/GroupOfOrganismsModel.js

module.exports = GroupOfOrganisms;