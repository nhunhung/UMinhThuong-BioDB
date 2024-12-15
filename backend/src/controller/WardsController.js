
const WardsService = require("../services/WardsService")
const createWards = async (req, res) => {
    try {
        const { ward_name, districts_id } = req.body;
        if (!ward_name || !districts_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await WardsService.createWards(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateWards = async (req, res) => {
    try {
        const wards_id = req.params.id;

        if (!wards_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'wards_id not exists'
            })
        }
        const respone = await WardsService.updateWards(wards_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteWards = async (req, res) => {
    try {
        const wards_id = req.params.id;
        if (!wards_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Wards is not exists'
            })
        }
        const response = await WardsService.deleteWards(wards_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewWard = async (req, res) => {
    try {
        const { ward_name, districts_id } = req.body;
        const wardsData = { ward_name, districts_id };

        console.log(">>> Check name == ", wardsData);
        const newWard = await WardsService.postWard(wardsData);

        return res.status(201).json({
            message: 'Ward created successfully!',
            data: newWard
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
const getDetailWards = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await WardsService.getDetailWards(id);

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createWards,
    updateWards,
    deleteWards,
    getDetailWards
}