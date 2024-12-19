
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
const createNewClass = async (req, res) => {
    try {
        const { class_name,
            phylum_id } = req.body;
        const classesData = {
            class_name,
            phylum_id
        };

        console.log(">>> Check data input == ", classesData);
        const newClass = await ClassService.postClass(classesData);

        return res.status(201).json({
            message: 'Class created successfully!',
            data: newClass
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
const getDetailClass = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await ClassService.getDetailClass(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createClass,
    updateClass,
    deleteClass,
    createNewClass,
    getDetailClass
}