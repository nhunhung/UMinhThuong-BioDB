const { postProvince } = require("../service/provinces.service")

const createNewProvince = async (req, res) => {
    try{
        const provincesData = req.body.name;
        console.log(">>> Check name == ", provincesData);
        const newProvince = await postProvince(provincesData);

        return res.status(201).json({
            message: 'Province created successfully!',
            data: newProvince
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewProvince }