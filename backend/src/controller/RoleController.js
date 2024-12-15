const Role = require("../models/RoleModel");
const RoleService = require("../services/RoleService")
const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await RoleService.createRole(name);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateRole = async (req, res) => {
    try {
        const name = req.body;
        const role_id = req.params.id;
        if (!name || !role_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await RoleService.updateRole(role_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await RoleService.deleteRole(id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const getDetailRole = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await RoleService.getDetailRole(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getDetailRole
}