const ConservationStatus = require("../models/ConservationStatusModel");
const Identification = require("../models/IdentificationModel");
const LocationSample = require("../models/LocationSampleModel");
const Organism = require("../models/OrganismModel");
const Role = require("../models/RoleModel");
const Sample = require("../models/SampleModel");
const Users = require("../models/UsersModel");
const createSample = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { locationsample_id, organism_id, ...optionalFields } = data;
            const samplewithlocation = await LocationSample.findAll({
                where: { locationsample_id: locationsample_id }
            });

            if (samplewithlocation.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'location_sample not exist',

                })
            }
            const samplewithorganism = await Organism.findAll({
                where: { organism_id: organism_id }
            });

            if (samplewithorganism.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'organism_id not exist',

                })
            }
            const createSample = await Sample.create(
                {
                    locationsample_id,
                    organism_id,
                    ...optionalFields
                }
            )
            if (createSample) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createSample
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const updateSample = (sample_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { locationsample_id, organism_id } = data
            const checkSample = await Sample.findByPk(sample_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkSample === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Sample is not defined'
                })

            }
            if (locationsample_id !== undefined) {
                const samplewithlocation = await LocationSample.findAll({
                    where: { locationsample_id: locationsample_id }
                });

                if (samplewithlocation.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'locationsample_id not exist',

                    })
                }

            }
            if (organism_id !== undefined) {
                const samplewithorganism = await Organism.findAll({
                    where: { organism_id: organism_id }
                });

                if (samplewithorganism.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'organism_id not exist',

                    })
                }

            }
            await Sample.update(data, { where: { sample_id } }); // Cập nhật dữ liệu
            const updatedSample = await Sample.findByPk(sample_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedSample
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteSample = (sample_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sample = await Sample.findByPk(sample_id);
            if (!sample) {
                return reject({
                    status: 'ERROR',
                    message: 'Sample is not defined'
                })
            }

            await Identification.destroy({ where: { sample_id: sample_id } });
            await sample.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Sample Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}

module.exports = {
    createSample,
    updateSample,
    deleteSample
}