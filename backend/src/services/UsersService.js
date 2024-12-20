const FileUpLoad = require("../models/FileUploadModel");
const Message = require("../models/MessageModel");
const Role = require("../models/RoleModel");
const Users = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUsers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password, firstname, lastname, role_id, email } = data;
            const usersWithRole = await Role.findAll({
                where: { role_id: role_id }
            });

            if (usersWithRole.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'role_id not exist',

                })
            }
            const checkUser = await Users.findOne({
                where: { email: email }
            });
            if (checkUser !== null) {
                return reject({
                    status: 'ERROR',
                    message: 'Email da ton tai'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await Users.create(
                {
                    username,
                    password: hash,
                    firstname,
                    lastname,
                    email,
                    role_id
                }
            )
            if (createUser) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const loginUser = (userLogin) => {

    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await Users.findOne({
                where: { email: email }
            });
            if (checkUser === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Email not exists'
                })
            }

            console.log('check pass', checkUser.password)
            console.log('password', password)
            const comparePassword = bcrypt.compareSync(password, checkUser.password);

            console.log('comparePassword', comparePassword)

            if (!comparePassword) {
                return reject({
                    status: 'ERROR',
                    message: 'The password or user is incorrect'
                });
            }
            const access_token = await generalAccessToken({
                id: checkUser.users_id,
                role_id: checkUser.role_id
            })

            console.log('access_token', access_token)

            const refresh_token = await generalRefreshToken({
                id: checkUser.users_id,
                role_id: checkUser.role_id
            })

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                user: {
                    users_id: checkUser.users_id,
                    username: checkUser.username,
                    firstname: checkUser.firstname,
                    lastname: checkUser.lastname,
                    email: checkUser.email,
                    role_id: checkUser.role_id,
                    avatar: checkUser.avatar
                },
                access_token: access_token,
                refresh_token: refresh_token
            });

        } catch (e) {
            reject(e)
            console.log(e);
            console.log('not successs')
        }
    })
}

const loginAdmin = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const admin = await Users.findOne({
                where: { email: email, role_id: [1, 2] }  // Chỉ chấp nhận role_id là 1 (admin) hoặc 2 (editor)
            });

            if (!admin) {
                return reject({
                    status: 'ERROR',
                    message: 'Email not exists or not authorized as admin/editor'
                });
            }

            const comparePassword = bcrypt.compareSync(password, admin.password);

            if (!comparePassword) {
                return reject({
                    status: 'ERROR',
                    message: 'The password or user is incorrect'
                });
            }

            const access_token = await generalAccessToken({
                id: admin.users_id,
                role_id: admin.role_id
            });

            const refresh_token = await generalRefreshToken({
                id: admin.users_id,
                role_id: admin.role_id
            });

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                user: {
                    users_id: admin.users_id,
                    username: admin.username,
                    firstname: admin.firstname,
                    lastname: admin.lastname,
                    email: admin.email,
                    role_id: admin.role_id,
                    avatar: admin.avatar
                },
                access_token: access_token,
                refresh_token: refresh_token
            });

        } catch (e) {
            reject(e);
        }
    });
};




const updateUsers = (users_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { role_id, password, ...otherData } = data;
            const checkUsers = await Users.findByPk(users_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkUsers === null) {
                return reject({
                    status: 'ERROR',
                    message: 'User is not defined'
                })

            }
            if (role_id !== undefined) {
                const usersWithRole = await Role.findAll({
                    where: { role_id: role_id }
                });

                if (usersWithRole.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'role_id not exist',

                    })
                }

            }

            const updateData = {
                ...otherData,
                ...(password !== undefined && { password: bcrypt.hashSync(password, 10) }),
                ...(role_id !== undefined && { role_id }),
            };

            await Users.update(updateData, { where: { users_id: users_id } }); // Cập nhật dữ liệu
            const updatedUsers = await Users.findByPk(users_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUsers,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
// const updateUsersPassword = (users_id, passwordObj) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkUsers = await Users.findByPk(users_id);  // Tìm theo khóa chính
//             console.log('check')
//             if (checkUsers === null) {
//                 return reject({
//                     status: 'ERROR',
//                     message: 'User is not defined'
//                 })

//             }
//             const password = passwordObj?.password;
//             if (!password) {
//                 return reject({
//                     status: 'ERROR',
//                     message: 'Password is required',
//                 });
//             }
//             const hash = bcrypt.hashSync(password, 10)
//             // await Users.update({ password: hash }, { where: { users_id: users_id } });
//             checkUsers.password = hash;
//             await checkUsers.save();
//             const updatedUsers = await Users.findByPk(users_id);
//             return resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: updatedUsers,
//             })
//         } catch (e) {
//             reject(e)
//             console.log('not success', e)
//         }
//     })
// }
const updateUsersPassword = (users_id, passwordObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra người dùng có tồn tại
            const checkUsers = await Users.findByPk(users_id);

            if (!checkUsers) {
                return reject({
                    status: 'ERROR',
                    message: 'User is not defined',
                });
            }

            // Kiểm tra mật khẩu mới
            const password = passwordObj?.password;
            if (!password) {
                return reject({
                    status: 'ERROR',
                    message: 'Password is required',
                });
            }


            const hash = bcrypt.hashSync(password, 10);


            checkUsers.password = hash;
            await checkUsers.save();


            const updatedUsers = await Users.findByPk(users_id);
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUsers,
            });
        } catch (e) {
            console.error('Error in updateUsersPassword:', e);
            return reject({
                status: 'ERROR',
                message: 'An error occurred during password update',
                error: e,
            });
        }
    });
};

const deleteUsers = (users_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await Users.findByPk(users_id);
            if (!users) {
                return reject({
                    status: 'ERROR',
                    message: 'Users is not defined'
                })
            }
            await FileUpLoad.destroy({ where: { users_id: users_id } });
            await Message.destroy({ where: { users_id: users_id } });
            await users.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Users Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}

const getAllUsers = async () => {
    try {
        const users = await Users.findAll();

        return users;
    } catch (e) {
        throw new Error('Error fetching users');
    }
};


module.exports = {
    createUsers,
    updateUsers,
    deleteUsers,
    loginUser,
    updateUsersPassword,
    getAllUsers,
    loginAdmin
}