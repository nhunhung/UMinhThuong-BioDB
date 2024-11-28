const { postDistrict } = require("../service/districts.service")

const createNewDistrict = async (req, res) => {
    try {
        const { name, provinces_id } = req.body;
        const districtsData = { name, provinces_id };
        
        console.log(">>> Check name == ", districtsData);
        const newDistrict = await postDistrict(districtsData);

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
module.exports = { createNewDistrict }