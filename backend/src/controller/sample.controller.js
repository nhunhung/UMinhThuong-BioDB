const { postSample } = require("../service/sample.service")

const createNewSample = async (req, res) => {
    try {
        const { locationsample_id, organism_id, recordNumber1, project, recordType, museumCode, specimenCode, typeSpecimen, recordNumber2, specimenQuantity, primaryCollector, collaborator, recordDate, recordMonth, recordYear } = req.body;
        const SampleData = { locationsample_id, organism_id, recordNumber1, project, recordType, museumCode, specimenCode, typeSpecimen, recordNumber2, specimenQuantity, primaryCollector, collaborator, recordDate, recordMonth, recordYear };

        console.log(">>> Check name == ", SampleData);
        const newSample = await postSample(SampleData);

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
module.exports = { createNewSample }