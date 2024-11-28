const db = require("../config/database");
const { Sample } = db;

const postSample = async (SampleData) => {
    try {
        const sample = await Sample.create({
            dateCollected: SampleData.dateCollected,
            collector: SampleData.collector,
            notes: SampleData.notes,
            locationsample_id: SampleData.locationsample_id,
            orgaism_id:SampleData.orgaism_id
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