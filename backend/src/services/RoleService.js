const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const createRole = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdRole = await Role.create({ name });
            if (createdRole) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdRole
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const updateRole = (role_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRole = await Role.findByPk(role_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkRole === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Role is not defined'
                })

            }
            await Role.update(data, { where: { role_id } }); // Cập nhật dữ liệu
            const updatedRole = await Role.findByPk(role_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedRole,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteRole = (role_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await Role.findByPk(role_id);
            if (!role) {
                return reject({
                    status: 'ERROR',
                    message: 'Role is not defined'
                })
            }
            await Users.destroy({ where: { role_id: role_id } });

            await role.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Role Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const getDetailRole = (role_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await Role.findOne({
                where: { role_id: role_id }
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
    createRole,
    updateRole,
    deleteRole,
    getDetailRole
}