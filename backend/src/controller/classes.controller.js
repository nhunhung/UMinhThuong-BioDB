const { postClass } = require("../service/classes.service")

const createNewClass = async (req, res) => {
    try {
        const { class_name,
            phylum_id } = req.body;
        const classesData = {
            class_name,
            phylum_id
        };

        console.log(">>> Check data input == ", classesData);
        const newClass = await postClass(classesData);

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
module.exports = { createNewClass }