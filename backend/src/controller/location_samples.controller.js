const { postLocationSample } = require("../service/location_samples.service")

const createNewLocationSample = async (req, res) => {
    try {
        const { country, provinces_id, districts_id, wards_id, collectionVillage, location, locationNotes, latitude, northSouth, longitude, eastWest, elevation, maxElevationRange, elevationUnit, vn2000Longitude, vn2000Latitude } = req.body;
        const locationSamplesData = { country, provinces_id, districts_id, wards_id, collectionVillage, location, locationNotes, latitude, northSouth, longitude, eastWest, elevation, maxElevationRange, elevationUnit, vn2000Longitude, vn2000Latitude };

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