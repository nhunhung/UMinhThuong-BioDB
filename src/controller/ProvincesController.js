const Role = require("../models/RoleModel");
const RoleService = require("../services/RoleService")
const ProvincesService = require("../services/ProvincesService")
const createProvinces = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await ProvincesService.createProvinces(name)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateProvinces = async (req, res) => {
    try {
        const { name } = req.body;
        const provinces_id = req.params.id;
        if (!name || !provinces_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await ProvincesService.updatedProvinces(provinces_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteProvinces = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await ProvincesService.deleteProvinces(id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createProvinces,
    updateProvinces,
    deleteProvinces
}