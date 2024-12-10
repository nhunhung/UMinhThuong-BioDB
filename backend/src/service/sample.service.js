const db = require("../config/database");
const { Sample } = db;

const postSample = async (SampleData) => {
    try {
        const sample = await Sample.create({
            locationsample_id: SampleData.locationsample_id,
            organism_id: SampleData.organism_id,
            recordNumber1: SampleData.recordNumber1,
            project: SampleData.project,
            recordType: SampleData.recordType,
            museumCode: SampleData.museumCode,
            specimenCode: SampleData.specimenCode,
            typeSpecimen: SampleData.typeSpecimen,
            recordNumber2: SampleData.recordNumber2,
            specimenQuantity: SampleData.specimenQuantity,
            primaryCollector: SampleData.primaryCollector,
            collaborator: SampleData.collaborator,
            recordDate: SampleData.recordDate,
            recordMonth: SampleData.recordMonth,
            recordYear: SampleData.recordYear
        });
        return sample;
    } catch (error) {
        console.error("Error creating a new sample: ", error.message);
        throw error;
    }
}

module.exports = {
    postSample
}