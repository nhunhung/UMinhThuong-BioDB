const Districts = require("../models/DistrictsModel");
const FileUpLoad = require("../models/FileUploadModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createDistricts = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { district_name, provinces_id } = data;
            const districtWithProvinces = await Provinces.findAll({
                where: { provinces_id: provinces_id }
            });

            if (districtWithProvinces.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'provinces_id not exist',

                })
            }

            const createdDistricts = await Districts.create(
                {
                    district_name,
                    provinces_id
                }
            )
            if (createdDistricts) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdDistricts
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateDistricts = (districts_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { provinces_id } = data;
            const checkDistricts = await Districts.findByPk(districts_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkDistricts === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Districts is not defined'
                })

            }
            if (provinces_id !== undefined) {
                const districtswithProvinces = await Provinces.findAll({
                    where: { provinces_id: provinces_id }
                });

                if (districtswithProvinces.length === 0) {
                    return resolve({
                        status: 'ERROR',
                        message: 'provinces_id not exist',

                    })
                }

            }

            await Districts.update(data, { where: { districts_id } }); // Cập nhật dữ liệu
            const updatedDistricts = await Districts.findByPk(Districts); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedDistricts,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteDistricts = (districts_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const districts = await Districts.findByPk(districts_id);
            if (!districts) {
                return reject({
                    status: 'ERROR',
                    message: 'Districts is not defined'
                })
            }
            // await FileUpLoad.destroy({ where: { users_id: users_id } });
            await Wards.destroy({ where: { districts_id: districts_id } });
            await LocationSample.destroy({ where: { districts_id: districts_id } });
            await districts.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Districts Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postDistrict = async (districtsData) => {
    try {
        const district = await Districts.create({
            district_name: districtsData.district_name,
            provinces_id: districtsData.provinces_id
        });
        return district;
    } catch (error) {
        console.error("Error creating a new district: ", error.message);
        throw error;
    }
}

module.exports = {
    createDistricts,
    updateDistricts,
    deleteDistricts,
    postDistrict
}