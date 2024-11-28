const { postSample } = require("../service/sample.service")

const createNewSample = async (req, res) => {
    try {
        const { dateCollected, collector, notes, locationsample_id, orgaism_id } = req.body;
        const SampleData = { dateCollected, collector, notes, locationsample_id, orgaism_id };

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