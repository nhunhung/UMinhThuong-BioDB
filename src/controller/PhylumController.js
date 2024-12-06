
const Kingdom = require("../models/KingdomModel");
const PhylumService = require("../services/PhylumService")
const createPhylum = async (req, res) => {
    try {
        const { name, kingdom_id } = req.body;
        if (!name || !kingdom_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await PhylumService.createPhylum(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updatePhylum = async (req, res) => {
    try {
        const phylum_id = req.params.id;

        if (!phylum) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'class_id not exists'
            })
        }
        const respone = await PhylumService.updatePhylum(phylum_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deletePhylum = async (req, res) => {
    try {
        const phylum_id = req.params.id;
        if (!phylum_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Phylum is not exists'
            })
        }
        const response = await PhylumService.deletePhylum(phylum_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createPhylum,
    updatePhylum,
    deletePhylum
}