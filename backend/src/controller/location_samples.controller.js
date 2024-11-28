const { postLocationSample } = require("../service/location_samples.service")

const createNewLocationSample = async (req, res) => {
    try {
        const { name, latitude, longitude, description, provinces_id, districts_id, wards_id } = req.body;
        const locationSamplesData = { name, latitude, longitude, description, provinces_id, districts_id, wards_id};

        console.log(">>> Check name == ", locationSamplesData);
        const newLocationSample = await postLocationSample(locationSamplesData);

        return res.status(201).json({
            message: 'Location sample created successfully!',
            data: newLocationSample
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewLocationSample }