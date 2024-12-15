const Districts = require("../models/DistrictsModel");
const FileUpLoad = require("../models/FileUploadModel");
const Identification = require("../models/IdentificationModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Provinces = require("../models/ProvincesModel");
const Role = require("../models/RoleModel");
const Sample = require("../models/SampleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createLocationSample = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { provinces_id, districts_id, wards_id, ...optionalFields } = data;
            const locationwithdistricts = await Districts.findAll({
                where: { districts_id: districts_id }
            });
            const locationwithprovinces = await Provinces.findAll({
                where: { provinces_id: provinces_id }
            });
            const locationwithwards = await Wards.findAll({
                where: { wards_id: wards_id }
            });

            if (locationwithdistricts.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'Districts_id not exist',

                })
            }
            if (locationwithprovinces.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'provinces_id not exist',

                })
            }
            if (locationwithwards.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'wards_id not exist',

                })
            }
            const createdLocationSample = await LocationSample.create(
                {

                    provinces_id,
                    districts_id,
                    wards_id,
                    ...optionalFields
                }
            )
            if (createdLocationSample) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdLocationSample
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateLocationSample = (locationsample_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { districts_id, wards_id, provinces_id } = data;
            const checkLocationSample = await LocationSample.findByPk(locationsample_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkLocationSample === null) {
                return reject({
                    status: 'ERROR',
                    message: 'LocationSample is not defined'
                })

            }
            if (districts_id !== undefined) {
                const locationwithDistricts = await Districts.findAll({
                    where: { districts_id: districts_id }
                });

                if (locationwithDistricts.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'districts_id not exist',

                    })
                }

            }
            if (wards_id !== undefined) {
                const locationwithwards = await Wards.findAll({
                    where: { wards_id: wards_id }
                });

                if (locationwithwards.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'wards_id not exist',

                    })
                }

            }
            if (provinces_id !== undefined) {
                const locationwithprovinces = await Provinces.findAll({
                    where: { provinces_id: provinces_id }
                });

                if (locationwithprovinces.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'provinces_id not exist',

                    })
                }

            }

            await LocationSample.update(data, { where: { locationsample_id } }); // Cập nhật dữ liệu
            const updatedLocationSample = await LocationSample.findByPk(locationsample_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedLocationSample,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteLocationSample = (locationsample_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const locationsample = await LocationSample.findByPk(locationsample_id);
            if (!locationsample) {
                return reject({
                    status: 'ERROR',
                    message: 'LocationSample is not defined'
                })
            }

            const samplesearch = await Sample.findAll({ where: { locationsample_id: locationsample_id } });
            const sampleIds = samplesearch.map(sample => sample.sample_id)
            if (samplesearch.length > 0) {
                console.log("thanh")
                await Identification.destroy({ where: { sample_id: sampleIds } });
            }
            Sample.destroy({ where: { locationsample_id: locationsample_id } })
            await locationsample.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete LocationSample Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postLocationSample = async (locationSampleData) => {
    try {
        const locationSample = await LocationSample.create({
            country: locationSampleData.country,
            provinces_id: locationSampleData.provinces_id,
            districts_id: locationSampleData.districts_id,
            wards_id: locationSampleData.wards_id,
            collectionVillage: locationSampleData.collectionVillage,
            location: locationSampleData.location,
            locationNotes: locationSampleData.locationNotes,
            latitude: locationSampleData.latitude,
            northSouth: locationSampleData.northSouth,
            longitude: locationSampleData.longitude,
            eastWest: locationSampleData.eastWest,
            elevation: locationSampleData.elevation,
            maxElevationRange: locationSampleData.maxElevationRange,
            elevationUnit: locationSampleData.elevationUnit,
            vn2000Longitude: locationSampleData.vn2000Longitude,
            vn2000Latitude: locationSampleData.vn2000Latitude,
        });
        return locationSample;
    } catch (error) {
        console.error("Error creating a new location sample: ", error.message);
        throw error;
    }
}
const getDetailLocationSample = (locationsample_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await LocationSample.findOne({
                where: { locationsample_id: locationsample_id }
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
    createLocationSample,
    updateLocationSample,
    deleteLocationSample,
    postLocationSample,
    getDetailLocationSample
}