
const WardsService = require("../services/WardsService")
const createWards = async (req, res) => {
    try {
        const { name, districts_id } = req.body;
        if (!name || !districts_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await WardsService.createWards(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateWards = async (req, res) => {
    try {
        const wards_id = req.params.id;

        if (!wards_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'wards_id not exists'
            })
        }
        const respone = await WardsService.updateWards(wards_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteWards = async (req, res) => {
    try {
        const wards_id = req.params.id;
        if (!wards_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Wards is not exists'
            })
        }
        const response = await WardsService.deleteWards(wards_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createWards,
    updateWards,
    deleteWards
}