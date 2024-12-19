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
const createNewIdentification = async (req, res) => {
    try {
        const { identificationStatus,
            reference,
            identifier,
            secondIdentifier,
            identificationDate,
            identificationMonth,
            identificationYear,
            organism_id,
            sample_id } = req.body;
        const IdentificationData = {
            identificationStatus,
            reference,
            identifier,
            secondIdentifier,
            identificationDate,
            identificationMonth,
            identificationYear,
            organism_id,
            sample_id
        };

        console.log(">>> Check data input == ", IdentificationData);
        const newIdentification = await IdentificationService.postIdentification(IdentificationData);

        return res.status(201).json({
            message: 'Identification created successfully!',
            data: newIdentification
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
const getDetailIdentification = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await IdentificationService.getDetailIdentification(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createIdentification,
    updateIdentification,
    deleteIdentification,
    createNewIdentification,
    getDetailIdentification
}