const GroupOfOrganisms = require("../models/GroupOfOrganismsModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const createGroupOfOrganisms = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { logo, goo_name } = data;
            const createdGroupOfOrganisms = await GroupOfOrganisms.create(
                {
                    logo,
                    goo_name
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
            // Delete the file if it exists
            if (group.logo) {
                const filePath = path.join(__dirname, "../storage/logo", group.logo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Remove the image file from disk
                }
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
const postGroupOfOrganism = async (groupOfOrganismsData) => {
    try {
        const groupOfOrganism = await GroupOfOrganisms.create({
            logo: groupOfOrganismsData.logo,
            goo_name: groupOfOrganismsData.goo_name
        });
        return groupOfOrganism;
    } catch (error) {
        console.error("Error creating a new group of organism: ", error.message);
        throw error;
    }
}
const getDetailGroupOfOrganisms = (groupoforganisms_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await GroupOfOrganisms.findOne({
                where: { groupoforganisms_id: groupoforganisms_id }
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
    createGroupOfOrganisms,
    updateGroupOfOrganisms,
    deleteGroupOfOrganisms,
    postGroupOfOrganism,
    getDetailGroupOfOrganisms
}