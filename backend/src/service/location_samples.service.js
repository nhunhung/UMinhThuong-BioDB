const db = require("../config/database");
const { LocationSample } = db;

const postLocationSample = async (locationSampleData) => {
    try {
        const locationSample = await LocationSample.create({
            country: locationSampleData.country,
            provinces_id: locationSampleData.provinces_id,
            districts_id: locationSampleData.districts_id,
            wards_id: locationSampleData.wards_id,
            collectionVillage: locationSampleData.collectionVillage,
            location: locationSampleData.location,
            locationNotes: locationSampleData.locationNotes,
            latitude: locationSampleData.latitude,
            northSouth: locationSampleData.northSouth,
            longitude: locationSampleData.longitude,
            eastWest: locationSampleData.eastWest,
            elevation: locationSampleData.elevation,
            maxElevationRange: locationSampleData.maxElevationRange,
            elevationUnit: locationSampleData.elevationUnit,
            vn2000Longitude: locationSampleData.vn2000Longitude,
            vn2000Latitude: locationSampleData.vn2000Latitude,
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