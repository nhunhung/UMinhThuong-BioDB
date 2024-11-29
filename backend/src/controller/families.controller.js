const { postFamily } = require("../service/families.service")

const createNewFamily = async (req, res) => {
    try {
        const { name, order_id } = req.body;
        const familyData = { name, order_id };

        console.log(">>> Check input data == ", familyData);
        const newFamily = await postFamily(familyData);

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
module.exports = { createNewFamily }