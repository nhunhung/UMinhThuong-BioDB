const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Organism = require('./OrganismModel');
const LocationSample = require('./LocationSampleModel');

const Sample = sequelize.define('Sample', {
    sample_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    locationsample_id: {
        type: DataTypes.INTEGER,
        references: {
            model: LocationSample,
            key: 'locationsample_id', // Đảm bảo khóa ngoại đúng với bảng LocationSample
        },
        allowNull: false,
    },

    organism_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Organism,
            key: 'organism_id', // Đảm bảo khóa ngoại đúng với bảng Organism
        },
        allowNull: false,
    },

    // Số hiệu thứ 1: recordNumber1 (String)
    // Mã số thứ 1 của mẫu, có thể null, mặc định là 'N/A'
    recordNumber1: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Dự án: project (String)
    // Tên dự án thu mẫu, có thể null, mặc định là 'N/A'
    project: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Kiểu ghi nhận: recordType (String)
    // Kiểu ghi nhận mẫu, có thể null, mặc định là 'N/A'
    recordType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Mã bảo tàng: museumCode (String)
    // Mã bảo tàng nơi lưu giữ mẫu, có thể null, mặc định là 'N/A'
    museumCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Mã mẫu vật: specimenCode (String)
    // Mã mẫu vật được thu thập, có thể null, mặc định là 'N/A'
    specimenCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Loại mẫu chuẩn: typeSpecimen (String)
    // Loại mẫu chuẩn của mẫu vật, có thể null, mặc định là 'N/A'
    typeSpecimen: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Số hiệu thứ 2: recordNumber2 (String)
    // Mã số thứ 2 của mẫu, có thể null, mặc định là 'N/A'
    recordNumber2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Số lượng mẫu vật: specimenQuantity (Integer)
    // Số lượng mẫu vật thu thập, có thể null, mặc định là 0
    specimenQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Mặc định là 0 nếu không có giá trị
    },

    // Người thu mẫu chính: primaryCollector (String)
    // Tên người thu mẫu chính, có thể null, mặc định là 'N/A'
    primaryCollector: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Cộng sự: collaborator (String)
    // Tên cộng sự thu mẫu, có thể null, mặc định là 'N/A'
    collaborator: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A', // Mặc định là 'N/A' nếu không có giá trị
    },

    // Ngày ghi nhận: recordDate (Date)
    // Ngày ghi nhận mẫu, có thể null, mặc định là 'N/A'
    recordDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null, // Mặc định là null nếu không có giá trị
    },

    // Tháng ghi nhận: recordMonth (Integer)
    // Tháng ghi nhận mẫu, có thể null, mặc định là null
    recordMonth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null, // Mặc định là null nếu không có giá trị
    },

    // Năm ghi nhận: recordYear (Integer)
    // Năm ghi nhận mẫu, có thể null, mặc định là null
    recordYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null, // Mặc định là null nếu không có giá trị
    },

});

// Định nghĩa quan hệ many-to-many
LocationSample.belongsToMany(Organism, {
    through: Sample,
    foreignKey: 'locationsample_id',
    otherKey: 'organism_id',
});
Organism.belongsToMany(LocationSample, {
    through: Sample,
    foreignKey: 'organism_id',
    otherKey: 'locationsample_id',
});

module.exports = Sample;
