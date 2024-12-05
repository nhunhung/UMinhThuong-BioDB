
const ClassService = require("../services/ClassService")
const createClass = async (req, res) => {
    try {
        const { name, phylum_id } = req.body;
        if (!name || !phylum_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await ClassService.createClass(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateClass = async (req, res) => {
    try {
        const class_id = req.params.id;

        if (!class_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'class_id not exists'
            })
        }
        const respone = await ClassService.updateClass(class_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteClass = async (req, res) => {
    try {
        const class_id = req.params.id;
        if (!class_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'class is not exists'
            })
        }
        const response = await ClassService.deleteClass(class_id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createClass,
    updateClass,
    deleteClass
}