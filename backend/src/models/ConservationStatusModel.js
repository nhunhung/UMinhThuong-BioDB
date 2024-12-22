const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const ConservationStatus = sequelize.define('ConservationStatus', {
    conservationstatus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    iucnRedList: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là null nếu không có giá trị cụ thể
    },

    // Phiên bản sách đỏ Thế giới: iucnRedListVersion (String) - Phiên bản của Sách đỏ Thế giới
    iucnRedListVersion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị cụ thể
    },

    // Thương mại quốc tế các loài động vật nguy cấp: citesSpecies (Boolean) - Có thuộc danh sách CITES không
    citesSpecies: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null, // Mặc định là null nếu không có giá trị cụ thể
    },

    // Sách đỏ Việt Nam: vietnamRedList (Boolean) - Có trong danh sách Sách đỏ Việt Nam
    vietnamRedList: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là null nếu không có giá trị cụ thể
    },

    // Nghị định số 81/2021/NĐ-CP: decree81 (String) - Thông tin liên quan đến Nghị định 81/2021/NĐ-CP
    decree81: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị cụ thể
    },

    // Nghị định số 64/2019/NĐ-CP: decree64 (String) - Thông tin liên quan đến Nghị định 64/2019/NĐ-CP
    decree64: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị cụ thể
    },

    // Đặc hữu: endemic (Boolean) - Có phải là loài đặc hữu không
    endemic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null, // Mặc định là null nếu không có giá trị cụ thể
    },

    // Thông tư 35/2018/TT-BTNMT: circular35 (String) - Thông tin liên quan đến Thông tư 35/2018/TT-BTNMT
    circular35: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị cụ thể
    },
}, {
    tableName: 'ConservationStatus',
    timestamps: false
});

module.exports = ConservationStatus;
