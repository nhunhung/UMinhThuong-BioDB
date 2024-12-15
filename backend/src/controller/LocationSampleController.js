
const LocationSampleService = require("../services/LocationSampleService")
const createLocationSample = async (req, res) => {
    try {
        const { provinces_id, districts_id, wards_id } = req.body;
        if (!districts_id || !provinces_id || !wards_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await LocationSampleService.createLocationSample(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateLocationSample = async (req, res) => {
    try {
        const locationsample_id = req.params.id;

        if (!locationsample_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'locationsample_id not exists'
            })
        }
        const respone = await LocationSampleService.updateLocationSample(locationsample_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteLocationSample = async (req, res) => {
    try {
        const locationsample_id = req.params.id;
        if (!locationsample_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'LocationSample is not exists'
            })
        }
        const response = await LocationSampleService.deleteLocationSample(locationsample_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
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
const getDetailLocationSample = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await LocationSampleService.getDetailLocationSample(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createLocationSample,
    updateLocationSample,
    deleteLocationSample,
    createNewLocationSample,
    getDetailLocationSample
}