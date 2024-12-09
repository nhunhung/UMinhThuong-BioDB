
const GenusService = require("../services/GenusService")
const createGenus = async (req, res) => {
    try {
        const { name, family_id } = req.body;
        if (!name || !family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await GenusService.createGenus(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateGenus = async (req, res) => {
    try {
        const genus_id = req.params.id;

        if (!genus_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'genus_id not exists'
            })
        }
        const respone = await GenusService.updateGenus(genus_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteGenus = async (req, res) => {
    try {
        const genus_id = req.params.id;
        if (!genus_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Genus is not exists'
            })
        }
        const response = await GenusService.deleteGenus(genus_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createGenus,
    updateGenus,
    deleteGenus
}