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
const Sample = require("../models/SampleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");

const createIdentification = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { organism_id, sample_id, ...optionalFields } = data;
            const idenwithorga = await Organism.findAll({
                where: { organism_id }
            });

            if (idenwithorga.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'Organism not exist',

                })
            }
            const idenwithsam = await Sample.findAll({
                where: { sample_id }
            });

            if (idenwithorga.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'Sample not exist',

                })
            }

            const createdIden = await Identification.create(
                {
                    organism_id,
                    sample_id,
                    ...optionalFields
                }
            )
            if (createdIden) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdIden
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateIdentification = (identification_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { sample_id, organism_id } = data;
            const checkIden = await Identification.findByPk(identification_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkIden === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Identification is not defined'
                })

            }
            if (sample_id !== undefined) {
                const idenwithsample = await Sample.findAll({
                    where: { sample_id: sample_id }
                });

                if (idenwithsample.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'sample not exist',

                    })
                }

            }
            if (organism_id !== undefined) {
                const idenwithor = await Organism.findAll({
                    where: { organism_id: organism_id }
                });

                if (idenwithor.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'Organism not exist',

                    })
                }

            }


            await Identification.update(data, { where: { identification_id } }); // Cập nhật dữ liệu
            const updatedIden = await Identification.findByPk(identification_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedIden
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteIdentification = (identification_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const identification = await Identification.findByPk(identification_id);
            if (!identification) {
                return reject({
                    status: 'ERROR',
                    message: 'Identification is not defined'
                })
            }

            await identification.destroy()







            return resolve({
                status: 'OK',
                message: 'Delete Identificatrion Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postIdentification = async (identificationData) => {
    try {
        const identification = await Identification.create({
            identificationStatus: identificationData.identificationStatus,
            reference: identificationData.reference,
            identifier: identificationData.identifier,
            secondIdentifier: identificationData.secondIdentifier,
            identificationDate: identificationData.identificationDate,
            identificationMonth: identificationData.identificationMonth,
            identificationYear: identificationData.identificationYear,
            organism_id: identificationData.organism_id,
            sample_id: identificationData.sample_id
        });
        return identification;
    } catch (error) {
        console.error("Error creating a new indentification: ", error.message);
        throw error;
    }
}
module.exports = {
    createIdentification,
    updateIdentification,
    deleteIdentification,
    postIdentification
}