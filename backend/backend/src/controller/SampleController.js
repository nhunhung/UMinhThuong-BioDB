const Role = require("../models/RoleModel");
const SampleService = require("../services/SampleService")
const createSample = async (req, res) => {
    try {
        const { locationsample_id, organism_id } = req.body;
        if (!locationsample_id || !organism_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await SampleService.createSample(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateSample = async (req, res) => {
    try {

        const sample_id = req.params.id;
        if (!sample_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await SampleService.updateSample(sample_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteSample = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await SampleService.deleteSample(id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewSample = async (req, res) => {
    try {
        const { locationsample_id, organism_id, recordNumber1, project, recordType, museumCode, specimenCode, typeSpecimen, recordNumber2, specimenQuantity, primaryCollector, collaborator, recordDate, recordMonth, recordYear } = req.body;
        const SampleData = { locationsample_id, organism_id, recordNumber1, project, recordType, museumCode, specimenCode, typeSpecimen, recordNumber2, specimenQuantity, primaryCollector, collaborator, recordDate, recordMonth, recordYear };

        console.log(">>> Check name == ", SampleData);
        const newSample = await SampleService.postSample(SampleData);

        return res.status(201).json({
            message: 'Sample created successfully!',
            data: newSample
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = {
    createSample,
    updateSample,
    deleteSample,
    createNewSample
}