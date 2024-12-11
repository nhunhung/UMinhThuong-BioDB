const Districts = require("../models/DistrictsModel");
const FileUpLoad = require("../models/FileUploadModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createWards = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { ward_name, districts_id } = data;
            const wardswithdistricts = await Districts.findAll({
                where: { districts_id: districts_id }
            });

            if (wardswithdistricts.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'Districts_id not exist',

                })
            }
            const createdWards = await Wards.create(
                {
                    ward_name,
                    districts_id
                }
            )
            if (createdWards) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdWards
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateWards = (wards_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { districts_id } = data;
            const checkWards = await Wards.findByPk(wards_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkWards === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Wards is not defined'
                })

            }
            if (districts_id !== undefined) {
                const wardswithDistricts = await Districts.findAll({
                    where: { districts_id: districts_id }
                });

                if (wardswithDistricts.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'districts_id not exist',

                    })
                }

            }

            await Wards.update(data, { where: { wards_id } }); // Cập nhật dữ liệu
            const updatedWards = await Wards.findByPk(wards_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedWards,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteWards = (wards_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wards = await Wards.findByPk(wards_id);
            if (!wards) {
                return reject({
                    status: 'ERROR',
                    message: 'Wards is not defined'
                })
            }


            await LocationSample.destroy({ where: { wards_id: wards_id } });
            await wards.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Wards Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postWard = async (wardsData) => {
    try {
        const ward = await Wards.create({
            ward_name: wardsData.ward_name,
            districts_id: wardsData.districts_id
        });
        return ward;
    } catch (error) {
        console.error("Error creating a new ward: ", error.message);
        throw error;
    }
}

module.exports = {
    createWards,
    updateWards,
    deleteWards,
    postWard
}