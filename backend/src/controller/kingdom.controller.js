const { postKingdom } = require("../service/kingdom.service")

const createNewKingdom = async (req, res) => {
    try {
        const { kingdom_name } = req.body;
        const kingdomData = { kingdom_name };

        console.log(">>> Check input data == ", kingdomData);
        const newKingdom = await postKingdom(kingdomData);

        return res.status(201).json({
            message: 'Kingdom created successfully!',
            data: newKingdom
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewKingdom }