const { postConservationStatus } = require("../service/conservation_status.service")

const createNewConservationStatus = async (req, res) => {
    try {
        const { iucnRedList,
            circular35,
            endemic,
            decree64,
            decree81,
            vietnamRedList,
            citesSpecies,
            iucnRedListVersion, } = req.body;
        const conservationStatusData = {
            iucnRedList,
            circular35,
            endemic,
            decree64,
            decree81,
            vietnamRedList,
            citesSpecies,
            iucnRedListVersion,
        };

        console.log(">>> Check data input == ", conservationStatusData);
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