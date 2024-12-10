const Role = require("../models/RoleModel");
const GroupOfOrganismsService = require("../services/GroupOfOrganismsService")
const createGroupOfOrganisms = async (req, res) => {
    try {
       const {logo, name} = req.body
        if (!name || !logo) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await GroupOfOrganismsService.createGroupOfOrganisms(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateGroupOfOrganisms = async (req, res) => {
    try {
       
        const groupoforganisms_id = req.params.id;
        if (!groupoforganisms_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await GroupOfOrganismsService.updateGroupOfOrganisms(groupoforganisms_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteGroupOfOrganisms = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await GroupOfOrganismsService.deleteGroupOfOrganisms(id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createGroupOfOrganisms,
    updateGroupOfOrganisms,
    deleteGroupOfOrganisms
}