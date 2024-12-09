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
  { model: Order, attributes: ['name'] },
  { model: Family, attributes: ['name'] },
  { model: Genus, attributes: ['name'] },
  { model: GroupOfOrganism, attributes: ['name'] },
];

const addCustomInclude = (addCustomIncludes = []) => {
  return [...organismInclude, ...addCustomIncludes];
}

//Lấy toàn bộ Organism
const getAllOrganisms = async () => {
  try {
    return await Organism.findAll({
      include: organismInclude
    }); 
  } catch (err) {
    throw new Error(`Error fetching organisms ${err.message}`);
  }
};

// Lấy Organism theo groupId
const getOrganismsByGroups = async (groupIdsArray) => {
  try {
    const organisms = await Organism.findAll({
      where: {
        groupoforganisms_id: groupIdsArray  
      },
      include: organismInclude
    });

    if (organisms.length === 0) {
      throw new Error(`No organisms found in group with ID ${groupId}`);
    }
    return organisms;
  } catch (err) {
    throw new Error(`Error fetching organisms by group ID: ${err.message}`);
  }
};

const getOrganinsmById = async (organism_Id) => {
  try {
    const customIncludes = [
      { model: Kingdom, attributes: ['name'] },
      { model: Phylum, attributes: ['name'] },
      { model: Class, attributes: ['name'] },
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
    if (!organism) {throw new Error('Organism not found');}
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
        [Sequelize.literal(`(SELECT "name" FROM "GroupOfOrganisms" 
          WHERE "GroupOfOrganisms"."groupoforganisms_id" = "Organism"."groupoforganisms_id")`), 'name'],

        // Đếm số loài duy nhất (distinct scientificName)
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('scientificName'))), 'Loài'],

        // Tính tổng số "Ghi nhận" (số lần xuất hiện của scientificName)
        [Sequelize.fn('COUNT', Sequelize.col('groupoforganisms_id')), 'Ghi nhận']  
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


module.exports = {
  getAllOrganisms,
  getOrganismsByGroups,
  getOrganinsmById,
  deleteOrganism,
  updateOrganism,
  statisticOrganisms,
  getOrganismByNames
};
