const GroupOfOrganisms = require("../models/GroupOfOrganismsModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const createGroupOfOrganisms = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { logo, name } = data;
            const createdGroupOfOrganisms = await GroupOfOrganisms.create(
                {
                    logo,
                    name
                }
            )
            if (createdGroupOfOrganisms) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdGroupOfOrganisms
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const updateGroupOfOrganisms = (groupoforganisms_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkGroupOfOrganisms = await GroupOfOrganisms.findByPk(groupoforganisms_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkGroupOfOrganisms === null) {
                return reject({
                    status: 'ERROR',
                    message: 'GroupOfOrganisms is not defined'
                })

            }
            await GroupOfOrganisms.update(data, { where: { groupoforganisms_id } }); // Cập nhật dữ liệu
            const updatedGroupOfOrganisms = await GroupOfOrganisms.findByPk(groupoforganisms_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedGroupOfOrganisms
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteGroupOfOrganisms = (groupoforganisms_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const groupoforganisms = await GroupOfOrganisms.findByPk(groupoforganisms_id);
            if (!groupoforganisms) {
                return reject({
                    status: 'ERROR',
                    message: 'GroupOfOrganisms is not defined'
                })
            }
            await groupoforganisms.destroy();


            return resolve({
                status: 'OK',
                message: 'Delete GroupOfOrganisms Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}

module.exports = {
    createGroupOfOrganisms,
    updateGroupOfOrganisms,
    deleteGroupOfOrganisms
}