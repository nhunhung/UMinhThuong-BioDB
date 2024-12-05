
const OrganismService = require("../services/OrganismService")
const createOrganism = async (req, res) => {
    try {
        const { class_id, groupoforganisms_id, conservationstatus_id, kingdom_id, phylum_id, order_id, family_id } = req.body;
        if (!class_id || !groupoforganisms_id || !conservationstatus_id || !kingdom_id || !phylum_id || !order_id || !family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await OrganismService.createOrganism(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateOrganism = async (req, res) => {
    try {
        const organism_id = req.params.id;

        if (!organism_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'organi_id not exists'
            })
        }
        const respone = await OrganismService.updateOrganism(organism_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteOrganism = async (req, res) => {
    try {
        const organism_id = req.params.id;
        if (!organism_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'organism is not exists'
            })
        }
        const response = await OrganismService.deleteOrganism(organism_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createOrganism,
    updateOrganism,
    deleteOrganism
}