const Class = require("../models/ClassModel");
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
const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { order_name, class_id } = data;
            const orderwithclass = await Class.findAll({
                where: { class_id: class_id }
            });

            if (orderwithclass.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'class_id not exist',

                })
            }

            const createdOrder = await Orders.create(
                {
                    order_name,
                    class_id
                }
            )
            if (createdOrder) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateOrder = (order_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { class_id } = data;
            const checkOrder = await Orders.findByPk(order_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkOrder === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Orders is not defined'
                })

            }
            if (class_id !== undefined) {
                const orderwithclass = await Class.findAll({
                    where: { class_id: class_id }
                });

                if (orderwithclass.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'class_id not exist',

                    })
                }

            }

            await Orders.update(data, { where: { order_id } }); // Cập nhật dữ liệu
            const updatedOrder = await Orders.findByPk(order_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteOrder = (order_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Orders.findByPk(order_id);
            if (!order) {
                return reject({
                    status: 'ERROR',
                    message: 'Orders is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { order_id } });
            const organismIds = organismsearch.map(order => order.order_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            await Organism.destroy({ where: { order_id: order_id } });
            const familysearch = await Family.findAll({ where: { order_id: order_id } });
            const familyIds = familysearch.map(family => family.family_id);
            // await FileUpLoad.destroy({ where: { users_id: users_id } });
            if (familyIds.length > 0) {

                await Genus.destroy({ where: { family_id: familyIds } });


                await Family.destroy({ where: { order_id: order_id } });
            }




            await order.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Order Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postOrder = async (ordersData) => {
    try {
        const order = await Orders.create({
            order_name: ordersData.order_name,
            class_id: ordersData.class_id,

        });
        return order;
    } catch (error) {
        console.error("Error creating a new order: ", error.message);
        throw error;
    }
}
const getDetailOrder = (order_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await Orders.findOne({
                where: { order_id: order_id }
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
    createOrder,
    updateOrder,
    deleteOrder,
    postOrder,
    getDetailOrder
}