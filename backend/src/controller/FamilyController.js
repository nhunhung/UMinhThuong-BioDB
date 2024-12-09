
const FamilyService = require("../services/FamilyService")
const createFamily = async (req, res) => {
    try {
        const { name, order_id } = req.body;
        if (!name || !order_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await FamilyService.createFamily(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateFamily = async (req, res) => {
    try {
        const family_id = req.params.id;

        if (!family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'family_id not exists'
            })
        }
        const respone = await FamilyService.updateFamily(family_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteFamily = async (req, res) => {
    try {
        const family_id = req.params.id;
        if (!family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'family is not exists'
            })
        }
        const response = await FamilyService.deleteFamily(family_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createFamily,
    updateFamily,
    deleteFamily
}