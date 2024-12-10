const Class = require("../models/ClassModel");
const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");
const FileUpLoad = require("../models/FileUploadModel");
const Genus = require("../models/GenusModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Orders = require("../models/OrdersModel");
const Organism = require("../models/OrganismModel");
const Phylum = require("../models/PhylumModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, phylum_id } = data;
            const classwithphylum = await Phylum.findAll({
                where: { phylum_id: phylum_id }
            });

            if (classwithphylum.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'phylum_id not exist',

                })
            }

            const createdClass = await Class.create(
                {
                    name,
                    phylum_id
                }
            )
            if (createdClass) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdClass
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateClass = (class_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { phylum_id } = data;
            const checkClass = await Class.findByPk(class_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkClass === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Class is not defined'
                })

            }
            if (phylum_id !== undefined) {
                const classwithphylum = await Phylum.findAll({
                    where: { phylum_id: phylum_id }
                });

                if (classwithphylum.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'phylum_id not exist',

                    })
                }

            }

            await Class.update(data, { where: { class_id } }); // Cập nhật dữ liệu
            const updatedClass = await Class.findByPk(class_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedClass
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteClass = (class_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classes = await Class.findByPk(class_id);
            if (!classes) {
                return reject({
                    status: 'ERROR',
                    message: 'Class is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { class_id: class_id } });
            const organismIds = organismsearch.map(classes => classes.class_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            await Organism.destroy({ where: { class_id: class_id } });
            const ordersearch = await Orders.findAll({ where: { class_id: class_id } });
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
                await Orders.destroy({ where: { class_id: class_id } })
            }
            await classes.destroy()







            return resolve({
                status: 'OK',
                message: 'Delete Class Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
module.exports = {
    createClass,
    updateClass,
    deleteClass
}