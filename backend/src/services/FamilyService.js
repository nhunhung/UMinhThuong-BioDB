const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");
const FileUpLoad = require("../models/FileUploadModel");
const Genus = require("../models/GenusModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Orders = require("../models/OrdersModel");
const Organism = require("../models/OrganismModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createFamily = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { family_name, order_id } = data;
            const familywithorder = await Orders.findAll({
                where: { order_id: order_id }
            });

            if (familywithorder.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'order_id not exist',

                })
            }

            const createdFamily = await Family.create(
                {
                    family_name,
                    order_id
                }
            )
            if (createdFamily) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdFamily
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateFamily = (family_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { order_id } = data;
            const checkFamily = await Family.findByPk(family_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkFamily === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Family is not defined'
                })

            }
            if (order_id !== undefined) {
                const familywithorder = await Orders.findAll({
                    where: { order_id: order_id }
                });

                if (familywithorder.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'order_id not exist',

                    })
                }

            }

            await Family.update(data, { where: { family_id } }); // Cập nhật dữ liệu
            const updatedFamily = await Family.findByPk(family_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedFamily,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteFamily = (family_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const family = await Family.findByPk(family_id);
            if (!family) {
                return reject({
                    status: 'ERROR',
                    message: 'Genus is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { family_id: family_id } });
            const organismIds = organismsearch.map(family => family.family_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            // await FileUpLoad.destroy({ where: { users_id: users_id } });
            await Organism.destroy({ where: { family_id: family_id } });
            await Genus.destroy({ where: { family_id: family_id } });
            await family.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Family Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postFamily = async (familyData) => {
    try {
        const family = await Family.create({

            family_name: familyData.family_name,
            order_id: familyData.order_id
        });
        return family;
    } catch (error) {
        console.error("Error creating a new family: ", error.message);
        throw error;
    }
}
const getDetailFamily = (family_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await Family.findOne({
                where: { family_id: family_id }
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
    createFamily,
    updateFamily,
    deleteFamily,
    postFamily,
    getDetailFamily
}