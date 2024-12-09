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

module.exports = {
    createConservationStatus,
    updateConservationStatus,
    deleteConservationStatus
}