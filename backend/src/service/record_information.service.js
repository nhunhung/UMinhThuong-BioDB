const db = require("../config/database");
const { RecordInformation } = db;

const postRecordInformation = async (recordInfoData) => {
    try {
        const recordInfo = await RecordInformation.create({
            recorder: recordInfoData.recorder,
            recordId1: recordInfoData.recordId1,
            recordType: recordInfoData.recordType,
            sampleQuantity: recordInfoData.sampleQuantity,
            recorded: recordInfoData.recorded,
            recordDate: recordInfoData.recordDate,
            projectNameRelatedtoTheSample: recordInfoData.projectNameRelatedtoTheSample,
        });
        return recordInfo;
    } catch (error) {
        console.error("Error creating a new record information: ", error.message);
        throw error;
    }
}

module.exports = {
    postRecordInformation
}