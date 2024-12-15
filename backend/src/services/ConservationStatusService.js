const ConservationStatus = require("../models/ConservationStatusModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const createConservationStatus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const {endangeredLevel, redListWorld, redListVersion, vietnamRedBook, decree81} =  data;
            const createConservationStatus = await ConservationStatus.create(
                data
            )
            if (createConservationStatus) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createConservationStatus
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const updateConservationStatus = (conservationstatus_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkConservationStatus = await ConservationStatus.findByPk(conservationstatus_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkConservationStatus === null) {
                return reject({
                    status: 'ERROR',
                    message: 'ConservationStatus is not defined'
                })

            }
            await ConservationStatus.update(data, { where: { conservationstatus_id } }); // Cập nhật dữ liệu
            const updatedConservationStatus = await ConservationStatus.findByPk(conservationstatus_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedConservationStatus,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteConservationStatus = (conservationstatus_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conservationstatus = await ConservationStatus.findByPk(conservationstatus_id);
            if (!conservationstatus) {
                return reject({
                    status: 'ERROR',
                    message: 'ConservationStatus is not defined'
                })
            }


            await conservationstatus.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete ConservationStatus Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postConservationStatus = async (conservationStatusData) => {
    try {
        const conservationStatus = await ConservationStatus.create({
            iucnRedList: conservationStatusData.iucnRedList,
            circular35: conservationStatusData.circular35,
            endemic: conservationStatusData.endemic,
            decree64: conservationStatusData.decree64,
            decree81: conservationStatusData.decree81,
            vietnamRedList: conservationStatusData.vietnamRedList,
            citesSpecies: conservationStatusData.citesSpecies,
            iucnRedListVersion: conservationStatusData.iucnRedListVersion,
        });
        return conservationStatus;
    } catch (error) {
        console.error("Error creating a new conservation status: ", error.message);
        throw error;
    }
}
const getDetailConservationStatus = (conservationstatus_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await ConservationStatus.findOne({
                where: { conservationstatus_id: conservationstatus_id }
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
    createConservationStatus,
    updateConservationStatus,
    deleteConservationStatus,
    postConservationStatus,
    getDetailConservationStatus
}