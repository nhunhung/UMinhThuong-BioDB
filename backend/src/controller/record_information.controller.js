const { postRecordInformation } = require("../service/record_information.service")

const createNewRecordInformation= async (req, res) => {
    try {
        const { recorder,
            recordId1,
            recorded,
            recordType,
            sampleQuantity,
            recordDate,
            projectNameRelatedtoTheSample } = req.body;
        const recordInfoData = {
            recorder,
            recordId1,
            recorded,
            recordType,
            sampleQuantity,
            recordDate,
            projectNameRelatedtoTheSample
        };

        console.log(">>> Check name == ", recordInfoData);
        const newRecordInformation = await postRecordInformation(recordInfoData);

        return res.status(201).json({
            message: 'Record information created successfully!',
            data: newRecordInformation
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewRecordInformation }