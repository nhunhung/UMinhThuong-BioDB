
const DistrictsService = require("../services/DistrictsService")
const createDistricts = async (req, res) => {
    try {
        const { district_name, provinces_id } = req.body;
        if (!district_name || !provinces_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        
        const respone = await DistrictsService.createDistricts(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateDistricts = async (req, res) => {
    try {
        const districts_id = req.params.id;

        if (!districts_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Districts_id not exists'
            })
        }
        const respone = await DistrictsService.updateDistricts(districts_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteDistricts = async (req, res) => {
    try {
        const districts_id = req.params.id;
        if (!districts_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Districts is not exists'
            })
        }
        const response = await DistrictsService.deleteDistricts(districts_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewDistrict = async (req, res) => {
    try {
        const { district_name, provinces_id } = req.body;
        const districtsData = { district_name, provinces_id };

        console.log(">>> Check name == ", districtsData);
        const newDistrict = await DistrictsService.postDistrict(districtsData);

        return res.status(201).json({
            message: 'District created successfully!',
            data: newDistrict
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = {
    createDistricts,
    updateDistricts,
    deleteDistricts,
    createNewDistrict
}