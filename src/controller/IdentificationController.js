const Role = require("../models/RoleModel");
const IdentificationService = require("../services/IdentificationService")
const createIdentification = async (req, res) => {
    try {
        const { sample_id, organism_id } = req.body;
        if (!sample_id || !organism_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await IdentificationService.createIdentification(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateIdentification = async (req, res) => {
    try {

        const iden_id = req.params.id;
        if (!iden_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await IdentificationService.updateIdentification(iden_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteIdentification = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await IdentificationService.deleteIdentification(id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createIdentification,
    updateIdentification,
    deleteIdentification
}