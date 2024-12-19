const Message = require("../models/MessageModel");
const Users = require("../models/UsersModel");
const createMessage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { content, sent_date, status, users_id } = data;
            const messagewithUsers = await Users.findAll({
                where: { users_id: users_id }
            });

            if (messagewithUsers.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'users_id not exist',

                })
            }
            const createMessage = await Message.create(
                {
                    content,
                    sent_date,
                    status,
                    users_id
                }
            )
            if (createMessage) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createMessage
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateMassage = (message_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { users_id } = data;
            const checkMessage = await Message.findByPk(message_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkMessage === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Message is not defined'
                })

            }

            if (users_id !== undefined) {
                const messagewithUsers = await Users.findAll({
                    where: { users_id: users_id }
                });

                if (messagewithUsers.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'users_id not exist',

                    })
                }

            }
            await Message.update(data, { where: { message_id } }); // Cập nhật dữ liệu
            const updatedMessage = await Message.findByPk(message_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedMessage,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteMessage = (message_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const message = await Message.findByPk(message_id);
            if (!message) {
                return reject({
                    status: 'ERROR',
                    message: 'Message is not defined'
                })
            }
            await message.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Message Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const getDetailMessage = (message_id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await Message.findOne({
                where: { message_id: message_id }
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
    createMessage,
    updateMassage,
    deleteMessage,
    getDetailMessage
}