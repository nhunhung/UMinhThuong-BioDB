const { postWard } = require("../service/wards.service")

const createNewWard = async (req, res) => {
    try {
        const { name, districts_id } = req.body;
        const wardsData = { name, districts_id };

        console.log(">>> Check name == ", wardsData);
        const newWard = await postWard(wardsData);

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
module.exports = { createNewWard }