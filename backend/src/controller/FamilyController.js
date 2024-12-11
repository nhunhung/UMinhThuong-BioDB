
const FamilyService = require("../services/FamilyService")
const createFamily = async (req, res) => {
    try {
        const { family_name, order_id } = req.body;
        if (!family_name || !order_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await FamilyService.createFamily(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateFamily = async (req, res) => {
    try {
        const family_id = req.params.id;

        if (!family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'family_id not exists'
            })
        }
        const respone = await FamilyService.updateFamily(family_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteFamily = async (req, res) => {
    try {
        const family_id = req.params.id;
        if (!family_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'family is not exists'
            })
        }
        const response = await FamilyService.deleteFamily(family_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewFamily = async (req, res) => {
    try {
        const { family_name, order_id } = req.body;
        const familyData = { family_name, order_id };

        console.log(">>> Check input data == ", familyData);
        const newFamily = await FamilyService.postFamily(familyData);

        return res.status(201).json({
            message: 'Family status created successfully!',
            data: newFamily
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
    createFamily,
    updateFamily,
    deleteFamily,
    createNewFamily
}