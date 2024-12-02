const { postPhylum} = require("../service/phylums.service")

const createNewPhylum = async (req, res) => {
    try {
        const { name, kingdom_id } = req.body;
        const phylumsData = { name, kingdom_id };

        console.log(">>> Check data == ", phylumsData);
        const newPhylum = await postPhylum(phylumsData);

        return res.status(201).json({
            message: 'Phylum created successfully!',
            data: newPhylum
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewPhylum }