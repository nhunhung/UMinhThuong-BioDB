const Districts = require("../models/DistrictsModel");
const LocationSample = require("../models/LocationSampleModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createProvinces = (province_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createProvinces = await Provinces.create({ province_name })
            if (createProvinces) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProvinces
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const updatedProvinces = (provinces_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProvinces = await Provinces.findByPk(provinces_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkProvinces === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Provinces is not defined'
                })

            }
            await Provinces.update(data, { where: { provinces_id } }); // Cập nhật dữ liệu
            const updatedProvinces = await Provinces.findByPk(provinces_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProvinces,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteProvinces = (provinces_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinces = await Provinces.findByPk(provinces_id);
            if (!provinces) {
                return reject({
                    status: 'ERROR',
                    message: 'Provinces is not defined'
                })
            }
            const districtSearch = await Districts.findAll({ where: { provinces_id } });
            const districtsIds = districtSearch.map(districts => districts.districts_id)
            if (districtSearch.length > 0) {
                await Wards.destroy({ where: { districts_id: districtsIds } });
            }

            await Districts.destroy({ where: { provinces_id: provinces_id } });
            await LocationSample.destroy({ where: { provinces_id: provinces_id } });

            await provinces.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Provinces Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postProvince = async (provincesData) => {
    try {
        const province = await Provinces.create({ province_name: provincesData });
        return province;
    } catch (error) {
        console.error("Error creating a new province: ", error.message);
        throw error;
    }
}
const getDetailProvinces = (provinces_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await Provinces.findOne({
                where: { provinces_id: provinces_id }
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
    createProvinces,
    updatedProvinces,
    deleteProvinces,
    postProvince,
    getDetailProvinces
}