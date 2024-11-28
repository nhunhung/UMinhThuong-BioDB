const { postConservationStatus } = require("../service/conservation_status.service")

const createNewConservationStatus = async (req, res) => {
    try {
        const { endangeredLevel, redListWorld, redListVersion, vietnamRedBook, decree81 } = req.body;
        const conservationStatusData = { endangeredLevel, redListWorld, redListVersion, vietnamRedBook, decree81 };

        console.log(">>> Check name == ", conservationStatusData);
        const newConservationStatus = await postConservationStatus(conservationStatusData);

        return res.status(201).json({
            message: 'Conservation status created successfully!',
            data: newConservationStatus
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewConservationStatus }