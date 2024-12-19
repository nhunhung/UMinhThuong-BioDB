const FileUpLoad = require("../models/FileUploadModel");
const createFileUpLoad = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { filename, upload_date, status, users_id } = data;
            const fileuploadwithUsers = await Users.findAll({
                where: { users_id: users_id }
            });

            if (fileuploadwithUsers.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'users_id not exist',

                })
            }
            const createFileUpLoad = await FileUpLoad.create(
                {
                    filename,
                    upload_date,
                    status,
                    users_id
                }
            )
            if (createFileUpLoad) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createFileUpLoad
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateFileUpLoad = (fileupload_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { users_id } = data;
            const checkFileUpLoad = await FileUpLoad.findByPk(fileupload_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkFileUpLoad === null) {
                return reject({
                    status: 'ERROR',
                    message: 'CheckFileUpLoad is not defined'
                })

            }

            if (users_id !== undefined) {
                const fileuploadwithUsers = await Users.findAll({
                    where: { users_id: users_id }
                });

                if (fileuploadwithUsers.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'users_id not exist',

                    })
                }

            }
            await checkFileUpLoad.update(data, { where: { fileupload_id } }); // Cập nhật dữ liệu
            const updatedFileUpLoad = await FileUpLoad.findByPk(fileupload_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedFileUpLoad,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteFileUpLoad = (fileupload_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const FileUpLoads = await FileUpLoad.findByPk(fileupload_id);
            if (!FileUpLoads) {
                return reject({
                    status: 'ERROR',
                    message: 'FileUpLoad is not defined'
                })
            }
            await FileUpLoads.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete FileUpLoad Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const getDetailFileUpLoad = (fileupload_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await FileUpLoad.findOne({
                where: { fileupload_id: fileupload_id }
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
    createFileUpLoad,
    updateFileUpLoad,
    deleteFileUpLoad,
    getDetailFileUpLoad
}