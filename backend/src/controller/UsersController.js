const Users = require("../models/UsersModel");
const UsersService = require("../services/UsersService")
const createUsers = async (req, res) => {
    try {
        const { username, password, firstname, lastname, role_id, email } = req.body;
        if (!username || !password || !firstname || !lastname || !role_id || !email) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const reg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        console.log('isCheckEmail', isCheckEmail);
        const respone = await UsersService.createUsers(req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const reg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        console.log('isCheckEmail', isCheckEmail);

        console.log(req.body);
        console.log('success');
        const response = await UsersService.loginUser(req.body)
        const { refresh_token, ...newRespone } = response
        // console.log('response', response)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samsite: 'strict'
        })


        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateUsers = async (req, res) => {
    try {
        const users_id = req.params.id;

        if (!users_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Users_id not exists'
            })
        }
        const respone = await UsersService.updateUsers(users_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateUsersPassword = async (req, res) => {
    try {
        const users_id = req.params.id;
        const password = req.body;

        if (!users_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Users_id not exists'
            })
        }
        const respone = await UsersService.updateUsersPassword(users_id, password);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteUsers = async (req, res) => {
    try {
        const users_id = req.params.id;
        if (!users_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Users is not exists'
            })
        }
        const response = await UsersService.deleteUsers(users_id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}

const getUserProfile = (req, res) => {
    // Truy cập thông tin người dùng từ req.user sau khi token đã được xác thực
    const userId = req.user.id;  // ID người dùng đã được lưu vào req.user khi xác thực token

    Users.findOne({
        where: { users_id: userId },
        attributes: ['users_id', 'username', 'firstname', 'lastname', 'email', 'role_id', 'avatar']
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                user: {
                    users_id: user.users_id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role_id: user.role_id,
                    avatar: user.avatar
                }
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: 'ERROR',
                message: 'Server error',
                error: error.message
            });
        });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UsersService.getAllUsers();  // Lấy tất cả người dùng từ dịch vụ
        return res.status(200).json({
            status: 'SUCCESS',
            data: users
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error fetching users',
            error: e.message,
        });
    }
};


module.exports = {
    getUserProfile,
    createUsers,
    updateUsers,
    deleteUsers,
    loginUser,
    updateUsersPassword,
    getAllUsers,

}