
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
module.exports = {
    createLocationSample,
    updateLocationSample,
    deleteLocationSample
}