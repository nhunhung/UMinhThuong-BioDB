const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connectdb');
const Kingdom = require('./KingdomModel');
const Phylum = require('./PhylumModel');
const Class = require('./ClassModel');
const GroupOfOrganisms = require('./GroupOfOrganismsModel');
const ConservationStatus = require('./ConservationStatusModel');
const Family = require('./FamilyModel');
const Genus = require('./GenusModel');
const Orders = require('./OrdersModel');

const Organism = sequelize.define('Organism', {
    organism_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // Nuôi trồng: cultivated (Boolean)
    // Trạng thái nuôi trồng, có thể null, mặc định là false
    cultivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Mặc định là false nếu không có giá trị
    },

    // Cây chủ/Vật chủ: hostPlantAnimal (String)
    // Tên cây hoặc vật chủ của loài, có thể null, mặc định là 'N/A'
    hostPlantAnimal: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Ghi chú chung: generalNotes (String)
    // Ghi chú chung về loài, có thể null, mặc định là 'N/A'
    generalNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Ghi chú bảo tàng: museumNotes (String)
    // Ghi chú bảo tàng liên quan đến loài, có thể null, mặc định là 'N/A'
    museumNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Nguồn thông tin: informationSource (String)
    // Nguồn thông tin về loài, có thể null, mặc định là 'N/A'
    informationSource: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên loài cấp 1: speciesNameLevel1 (String)
    // Tên loài cấp 1, có thể null, mặc định là 'N/A'
    speciesNameLevel1: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tác giả thứ nhất: firstAuthor (String)
    // Tên tác giả đầu tiên đặt tên loài, có thể null, mặc định là 'N/A'
    firstAuthor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Dưới loài cấp 1: subspeciesLevel1 (String)
    // Tên loài cấp dưới loài cấp 1, có thể null, mặc định là 'N/A'
    subspeciesLevel1: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên loài cấp 2: speciesNameLevel2 (String)
    // Tên loài cấp 2, có thể null, mặc định là 'N/A'
    speciesNameLevel2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tác giả thứ hai: secondAuthor (String)
    // Tên tác giả thứ hai đặt tên loài cấp 2, có thể null, mặc định là 'N/A'
    secondAuthor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Dưới loài cấp 2: subspeciesLevel2 (String)
    // Tên loài cấp dưới loài cấp 2, có thể null, mặc định là 'N/A'
    subspeciesLevel2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên loài cấp 3: speciesNameLevel3 (String)
    // Tên loài cấp 3, có thể null, mặc định là 'N/A'
    speciesNameLevel3: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tác giả thứ ba: thirdAuthor (String)
    // Tên tác giả thứ ba đặt tên loài cấp 3, có thể null, mặc định là 'N/A'
    thirdAuthor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tình trạng danh pháp: nomenclatureStatus (String)
    // Tình trạng danh pháp của loài, có thể null, mặc định là 'N/A'
    nomenclatureStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Cấp độ danh pháp: nomenclatureLevel (String)
    // Cấp độ danh pháp của loài, có thể null, mặc định là 'N/A'
    nomenclatureLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên khoa học: scientificName (String)
    // Tên khoa học của loài, có thể null, mặc định là 'N/A'
    scientificName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên tác giả: authorName (String)
    // Tên tác giả của loài, có thể null, mặc định là 'N/A'
    authorName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tên thông thường: commonName (String)
    // Tên thông thường của loài, có thể null, mặc định là 'N/A'
    commonName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Tài liệu công bố của tên loài: publicationReference (String)
    // Tài liệu công bố liên quan đến tên loài, có thể null, mặc định là 'N/A'
    publicationReference: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Năm tác giả đặt tên: yearOfAuthorName (Integer)
    // Năm tác giả đặt tên loài, có thể null, mặc định là null
    yearOfAuthorName: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },

    // Tên đồng danh: synonymName (String)
    // Tên đồng danh của loài, có thể null, mặc định là 'N/A'
    synonymName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Dạng cây: treeForm (String)
    // Dạng cây của loài, có thể null, mặc định là 'N/A'
    treeForm: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Dạng sống: lifeForm (String)
    // Dạng sống của loài, có thể null, mặc định là 'N/A'
    lifeForm: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Ố sinh thái: ecologicalNiche (String)
    // Ố sinh thái của loài, có thể null, mặc định là 'N/A'
    ecologicalNiche: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Mô tả loài ghi nhận: speciesDescription (String)
    // Mô tả loài ghi nhận, có thể null, mặc định là 'N/A'
    speciesDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Sinh cảnh sống: habitat (String)
    // Sinh cảnh sống của loài, có thể null, mặc định là 'N/A'
    habitat: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Khu vực phân bố: distributionArea (String)
    // Khu vực phân bố của loài, có thể null, mặc định là 'N/A'
    distributionArea: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Vật hậu học: ethnobotany (String)
    // Thông tin về vật hậu học của loài, có thể null, mặc định là 'N/A'
    ethnobotany: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Nhóm công dụng: usageGroup (String)
    // Nhóm công dụng của loài, có thể null, mặc định là 'N/A'
    usageGroup: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A',
    },

    // Loài nguy cấp/quý hiếm: endangeredRareSpecies (Boolean)
    // Tình trạng nguy cấp của loài, có thể null, mặc định là false
    endangeredRareSpecies: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },

});

// Relationships
ConservationStatus.hasMany(Organism, { foreignKey: 'conservationstatus_id' });
Organism.belongsTo(ConservationStatus, { foreignKey: 'conservationstatus_id' });

GroupOfOrganisms.hasMany(Organism, { foreignKey: 'groupoforganisms_id' });
Organism.belongsTo(GroupOfOrganisms, { foreignKey: 'groupoforganisms_id' });

Kingdom.hasMany(Organism, { foreignKey: 'kingdom_id' });
Organism.belongsTo(Kingdom, { foreignKey: 'kingdom_id' });

Phylum.hasMany(Organism, { foreignKey: 'phylum_id' });
Organism.belongsTo(Phylum, { foreignKey: 'phylum_id' });

Class.hasMany(Organism, { foreignKey: 'class_id' });
Organism.belongsTo(Class, { foreignKey: 'class_id' });

Orders.hasMany(Organism, { foreignKey: 'order_id' });
Organism.belongsTo(Orders, { foreignKey: 'order_id' });

Family.hasMany(Organism, { foreignKey: 'family_id' });
Organism.belongsTo(Family, { foreignKey: 'family_id' });

Genus.hasMany(Organism, { foreignKey: 'genus_id' });
Organism.belongsTo(Genus, { foreignKey: 'genus_id' });

module.exports = Organism;
