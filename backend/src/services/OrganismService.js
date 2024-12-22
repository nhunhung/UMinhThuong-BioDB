const Organism = require('../models/OrganismModel');
const Order = require('../models/OrdersModel');
const Family = require('../models/FamilyModel');
const Genus = require('../models/GenusModel');
const GroupOfOrganism = require('../models/GroupOfOrganismsModel');
const Phylum = require('../models/PhylumModel');
const Kingdom = require('../models/KingdomModel');
const Class = require('../models/ClassModel');
const { sequelize, Op, literal } = require('sequelize');
const { Sequelize } = require('../config/database');


const organismInclude = [
  { model: Order, attributes: ['order_name'] },
  { model: Family, attributes: ['family_name'] },
  { model: Genus, attributes: ['genus_name'] },
  { model: GroupOfOrganism, attributes: ['goo_name'] },
];

const addCustomInclude = (addCustomIncludes = []) => {
  return [...organismInclude, ...addCustomIncludes];
}

//Lấy toàn bộ Organism
const getAllOrganisms = async (limit, offset) => {
  try {
    return await Organism.findAll({
      include: organismInclude,
      limit: limit,     // Giới hạn số lượng kết quả mỗi trang
      offset: offset    // Vị trí bắt đầu (dựa vào page và limit)
    });
  } catch (err) {
    throw new Error(`Error fetching organisms: ${err.message}`);
  }
};

const getOrganismsByKingdom = async (kingdomId, limit, offset) => {
  try {
    return await Organism.findAll({
      where: { kingdom_id: kingdomId }, // Lọc theo kingdom_id
      include: organismInclude,
      limit: limit,     // Giới hạn số lượng kết quả mỗi trang
      offset: offset    // Vị trí bắt đầu (dựa vào page và limit)
    });
  } catch (err) {
    throw new Error(`Error fetching organisms by kingdom: ${err.message}`);
  }
};

// Lấy Organism theo groupId
const getOrganismsByGroups = async (limit, offset, groupIdsArray) => {
  try {
    const organisms = await Organism.findAll({
      where: {
        groupoforganisms_id: groupIdsArray  // Lọc theo nhóm sinh vật
      },
      include: organismInclude,
      limit: limit,      // Giới hạn số lượng sinh vật mỗi trang
      offset: offset     // Vị trí bắt đầu (tính từ page và limit)
    });

    if (organisms.length === 0) {
      throw new Error(`No organisms found in the specified group(s)`);
    }

    return organisms;
  } catch (err) {
    throw new Error(`Error fetching organisms by group ID: ${err.message}`);
  }
};


const getOrganinsmById = async (organism_Id) => {
  try {
    const customIncludes = [
      { model: Kingdom, attributes: ['kingdom_name'] },
      { model: Phylum, attributes: ['phylum_name'] },
      { model: Class, attributes: ['class_name'] },
    ];

    return await Organism.findByPk(organism_Id, {
      include: addCustomInclude(customIncludes),  // Thêm includes vào phương thức findByPk
    });

  } catch (err) {
    throw new Error(`Error fetching organism by ID: ${err.message}`);
  }
}

const getOrganismByNames = async (kw) => {
  try {
    return await Organism.findAll({
      where: {
        [Op.or]: [
          {
            // Tìm kiếm trong scientificName, chỉ áp dụng unaccent() vào giá trị, giữ nguyên tên trường
            [Op.iLike]: literal(`unaccent("scientificName") ILIKE unaccent('%${kw}%')`)
          },
          {
            // Tìm kiếm trong commonName, chỉ áp dụng unaccent() vào giá trị, giữ nguyên tên trường
            [Op.iLike]: literal(`unaccent("commonName") ILIKE unaccent('%${kw}%')`)
          }
        ]
      },
      include: organismInclude  // Các include liên quan đến organism (nếu có)
    });
  } catch (err) {
    throw new Error(`Error fetching organisms: ${err.message}`);
  }
};


const updateOrganism = async (id, data) => {
  try {
    const organism = await Organism.findByPk(id);
    if (!organism) { throw new Error('Organism not found'); }
    // Cập nhật thông tin organism với dữ liệu mới
    const [updated] = await Organism.update(data, {
      where: { organism_id: id }  // Điều kiện xác định organism cần cập nhật
    });
  } catch (err) {
    throw new Error(`Error updating organism: ${err.message}`);
  }
};

const deleteOrganism = async (organism_Id) => {
  try {
    // Tìm và xóa organism
    const organism = await Organism.findByPk(organism_Id);
    if (!organism) {
      throw new Error('Organism not found');
    }
    await organism.destroy();

    // Cập nhật lại các organism_id lớn hơn
    await Organism.update(
      { organism_id: sequelize.literal('organism_id - 1') },
      {
        where: { organism_id: { [Op.gt]: organism_Id } }
      }
    );

    return { message: 'Organism deleted and IDs updated successfully' };
  } catch (err) {
    throw new Error(`Error deleting organism: ${err.message}`);
  }
};


const statisticOrganisms = async (group_ids) => {
  try {
    const result = await Organism.findAll({
      attributes: [
        // Lấy tên nhóm loài từ bảng "GroupOfOrganisms"
        [Sequelize.literal(`(SELECT "goo_name" FROM "GroupOfOrganisms" 
          WHERE "GroupOfOrganisms"."groupoforganisms_id" = "Organism"."groupoforganisms_id")`), 'goo_name'],

        // Đếm số loài duy nhất (distinct scientificName)
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('scientificName'))), 'Loai'],

        // Tính tổng số "Ghi nhận" (số lần xuất hiện của scientificName)
        [Sequelize.fn('COUNT', Sequelize.col('groupoforganisms_id')), 'Ghinhan']
      ],
      where: {
        groupoforganisms_id: { [Op.in]: group_ids }
      },
      group: ['groupoforganisms_id'],
    });

    return result;
  } catch (err) {
    throw new Error(`Error statistics organism: ${err.message}`);
  }
};


const postOrganism = async (organismsData) => {
  try {
    const organism = await Organism.create({
      cultivated: organismsData.cultivated,
      hostPlantAnimal: organismsData.hostPlantAnimal,
      generalNotes: organismsData.generalNotes,
      museumNotes: organismsData.museumNotes,
      informationSource: organismsData.informationSource,
      speciesNameLevel1: organismsData.speciesNameLevel1,
      firstAuthor: organismsData.firstAuthor,
      speciesNameLevel2: organismsData.speciesNameLevel2,
      subspeciesLevel1: organismsData.subspeciesLevel1,
      secondAuthor: organismsData.secondAuthor,
      subspeciesLevel2: organismsData.subspeciesLevel2,
      speciesNameLevel3: organismsData.speciesNameLevel3,
      thirdAuthor: organismsData.thirdAuthor,
      nomenclatureStatus: organismsData.nomenclatureStatus,
      nomenclatureLevel: organismsData.nomenclatureLevel,
      scientificName: organismsData.scientificName,
      authorName: organismsData.authorName,
      commonName: organismsData.commonName,
      publicationReference: organismsData.publicationReference,
      yearOfAuthorName: organismsData.yearOfAuthorName,
      synonymName: organismsData.synonymName,
      treeForm: organismsData.treeForm,
      lifeForm: organismsData.lifeForm,
      ecologicalNiche: organismsData.ecologicalNiche,
      speciesDescription: organismsData.speciesDescription,
      habitat: organismsData.habitat,
      distributionArea: organismsData.distributionArea,
      ethnobotany: organismsData.ethnobotany,
      usageGroup: organismsData.usageGroup,
      endangeredRareSpecies: organismsData.endangeredRareSpecies,
      images: organismsData.images,
      conservationstatus_id: organismsData.conservationstatus_id,
      groupoforganisms_id: organismsData.groupoforganisms_id,
      kingdom_id: organismsData.kingdom_id,
      phylum_id: organismsData.phylum_id,
      class_id: organismsData.class_id,
      order_id: organismsData.order_id,
      family_id: organismsData.family_id,
      genus_id: organismsData.genus_id
    });
    return organism;
  } catch (error) {
    console.error("Error creating a new organism: ", error.message);
    throw error;
  }
}
const getDetailOrganism = (organism_id) => {
  return new Promise(async (resolve, reject) => {

    try {
      const data = await Organism.findOne({
        where: { organism_id: organism_id }
      })

      if (data === null) {
        return reject({
          status: 'ERROR',
          message: 'data is not defined'
        })
      }



      return resolve({
        status: 'OK',
        message: 'lay thong tin  thanh cong',
        data: data


      })
    } catch (e) {
      reject(e)
      console.log('lay thong tin  that bai')
    }
  })
}

module.exports = {
  getAllOrganisms,
  getOrganismsByGroups,
  getOrganinsmById,
  deleteOrganism,
  updateOrganism,
  statisticOrganisms,
  getOrganismByNames,
  postOrganism,
  getDetailOrganism,
  getOrganismsByKingdom
};