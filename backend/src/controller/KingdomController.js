
const Kingdom = require("../models/KingdomModel");
const KingdomService = require("../services/KingdomService")
const createKingdom = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }


        const respone = await KingdomService.createKingdom(name)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateKingdom = async (req, res) => {
    try {
        const kingdom_id = req.params.id;

        if (!kingdom_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'class_id not exists'
            })
        }
        const respone = await KingdomService.updateKingdom(kingdom_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteKingdom = async (req, res) => {
    try {
        const kingdom_id = req.params.id;
        if (!kingdom_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'kingdom is not exists'
            })
        }
        const response = await KingdomService.deleteKingdom(kingdom_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createKingdom,
    updateKingdom,
    deleteKingdom
}