const Class = require("../models/ClassModel");
const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");
const FileUpLoad = require("../models/FileUploadModel");
const Genus = require("../models/GenusModel");
const Identification = require("../models/IdentificationModel");
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

const createKingdom = (name) => {
    return new Promise(async (resolve, reject) => {

        try {

            const createdKingdom = await Kingdom.create({ name });
            if (createdKingdom) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdKingdom
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateKingdom = (kingdom_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const checkKingdom = await Kingdom.findByPk(kingdom_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkKingdom === null) {
                return reject({
                    status: 'OK',
                    message: 'Kingdom is not defined'
                })

            }


            await Kingdom.update(data, { where: { kingdom_id } }); // Cập nhật dữ liệu
            const updatedKingdom = await Kingdom.findByPk(kingdom_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedKingdom
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteKingdom = (kingdom_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const kingdom = await Kingdom.findByPk(kingdom_id);
            if (!kingdom) {
                return reject({
                    status: 'ERROR',
                    message: 'Kingdom is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { kingdom_id: kingdom_id } });
            const organismIds = organismsearch.map(kingdom => kingdom.kingdom_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            await Organism.destroy({ where: { kingdom_id: kingdom_id } });
            const phylumsearch = await Phylum.findAll({ where: { kingdom_id: kingdom_id } });
            const phylumIds = phylumsearch.map(kingdom => kingdom.kingdom_id)
            const classsearch = await Class.findAll({ where: { phylum_id: phylumIds } });
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
                await Class.destroy({ where: { phylum_id: phylumIds } })
            }
            if (phylumsearch.length > 0) {
                await Phylum.destroy({ where: { kingdom_id: kingdom_id } })
            }
            await kingdom.destroy()







            return resolve({
                status: 'OK',
                message: 'Delete Kingdom Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
module.exports = {
    createKingdom,
    updateKingdom,
    deleteKingdom,
}