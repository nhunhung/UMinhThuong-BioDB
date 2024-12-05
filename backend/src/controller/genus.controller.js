const { postGenus } = require("../service/genus.service")

const createNewGenus = async (req, res) => {
    try {
        const { genus_name, family_id } = req.body;
        const genusData = { genus_name, family_id };

        console.log(">>> Check data == ", genusData);
        const newGenus = await postGenus(genusData);

        return res.status(201).json({
            message: 'Genus status created successfully!',
            data: newGenus
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewGenus }