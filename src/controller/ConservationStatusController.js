const Role = require("../models/RoleModel");
const ConservationStatusService = require("../services/ConservationStatusService")
const createConservationStatus = async (req, res) => {
    try {
        // const {endangeredLevel, redListWorld, redListVersion, vietnamRedBook, decree81} = req.body;
        // if (!endangeredLevel || !redListVersion || !redListWorld || !vietnamRedBook || !decree81) {
        //     return res.status(400).json({
        //         status: 'ERROR',
        //         message: 'The input is required'
        //     })
        // }
        const respone = await ConservationStatusService.createConservationStatus(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateConservationStatus = async (req, res) => {
    try {

        const conservationstatus_id = req.params.id;
        if (!conservationstatus_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await ConservationStatusService.updateConservationStatus(conservationstatus_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteConservationStatus = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await ConservationStatusService.deleteConservationStatus(id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createConservationStatus,
    updateConservationStatus,
    deleteConservationStatus
}