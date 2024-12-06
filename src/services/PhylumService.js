const Class = require("../models/ClassModel");
const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");
const FileUpLoad = require("../models/FileUploadModel");
const Genus = require("../models/GenusModel");
const Kingdom = require("../models/KingdomModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Orders = require("../models/OrdersModel");
const Organism = require("../models/OrganismModel");
const Phylum = require("../models/PhylumModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");

const createPhylum = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, kingdom_id } = data;
            const phylumwithkingdom = await Kingdom.findAll({
                where: { kingdom_id }
            });

            if (phylumwithkingdom.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'kingdom not exist',

                })
            }

            const createdPhylum = await Phylum.create(
                {
                    name,
                    kingdom_id
                }
            )
            if (createdPhylum) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdPhylum
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updatePhylum = (phylum_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { kingdom_id } = data;
            const checkPhylum = await Phylum.findByPk(phylum_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkPhylum === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Phylum is not defined'
                })

            }
            if (kingdom_id !== undefined) {
                const phylumwithkingdom = await Kingdom.findAll({
                    where: { kingdom_id: kingdom_id }
                });

                if (phylumwithkingdom.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'kingdom not exist',

                    })
                }

            }

            await Phylum.update(data, { where: { phylum_id } }); // Cập nhật dữ liệu
            const updatedPhylum = await Phylum.findByPk(phylum_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedPhylum
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deletePhylum = (phylum_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const phylum = await Phylum.findByPk(phylum_id);
            if (!phylum) {
                return reject({
                    status: 'ERROR',
                    message: 'Phylum is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { phylum_id: phylum_id } });
            const organismIds = organismsearch.map(phylum => phylum.phylum_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            await Organism.destroy({ where: { phylum_id: phylum_id } });
            const classsearch = await Class.findAll({ where: { phylum_id: phylum_id } });
            const classIds = classsearch.map(phylum => phylum.phylum_id)
            const ordersearch = await Orders.findAll({ where: { class_id: classIds } });
            const orderIds = ordersearch.map(order => order.order_id);
            const familysearch = await Family.findAll({ where: { order_id: orderIds } })
            const familyIds = familysearch.map(family => family.family_id);
            const genusSearch = await Genus.findAll({ where: { family_id: familyIds } })

            if (genusSearch.length > 0) {
                await Genus.destroy({ where: { family_id: familyIds } });
            }
            if (familysearch.length > 0) {
                await Family.destroy({ where: { order_id: orderIds } })
            }
            if (ordersearch.length > 0) {
                await Orders.destroy({ where: { class_id: classIds } })
            }
            if (classsearch.length > 0) {
                await Class.destroy({ where: { phylum_id: phylum_id } })
            }
            await phylum.destroy()







            return resolve({
                status: 'OK',
                message: 'Delete Phylum Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
module.exports = {
    createPhylum,
    updatePhylum,
    deletePhylum
}