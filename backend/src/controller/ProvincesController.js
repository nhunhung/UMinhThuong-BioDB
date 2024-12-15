const Role = require("../models/RoleModel");
const RoleService = require("../services/RoleService")
const ProvincesService = require("../services/ProvincesService")
const createProvinces = async (req, res) => {
    try {
        const { province_name } = req.body;
        if (!province_name) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await ProvincesService.createProvinces(province_name)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateProvinces = async (req, res) => {
    try {
        const { province_name } = req.body;
        const provinces_id = req.params.id;
        if (!province_name || !provinces_id) {
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
const createNewProvince = async (req, res) => {
    try {
        const provincesData = req.body.province_name;
        console.log(">>> Check name == ", provincesData);
        const newProvince = await ProvincesService.postProvince(provincesData);

        return res.status(201).json({
            message: 'Province created successfully!',
            data: newProvince
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = {
    createProvinces,
    updateProvinces,
    deleteProvinces,
    createNewProvince
}