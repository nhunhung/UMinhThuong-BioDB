const db = require("../config/database");
const { LocationSample } = db;

const postLocationSample = async (locationSampleData) => {
    try {
        const locationSample = await LocationSample.create({
            name: locationSampleData.name,
            latitude: locationSampleData.latitude,
            longitude: locationSampleData.longitude,
            description: locationSampleData.description,
            provinces_id: locationSampleData.provinces_id,
            districts_id: locationSampleData.districts_id,
            wards_id: locationSampleData.wards_id
        });
        return locationSample;
    } catch (error) {
        console.error("Error creating a new location sample: ", error.message);
        throw error;
    }
}

module.exports = {
    postLocationSample
}