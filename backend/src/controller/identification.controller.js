const { postIdentification } = require("../service/identification.service")

const createNewIdentification = async (req, res) => {
    try {
        const { identificationStatus,
            reference,
            identifier,
            secondIdentifier,
            identificationDate,
            identificationMonth,
            identificationYear,
            organism_id,
            sample_id } = req.body;
        const IdentificationData = {
            identificationStatus,
            reference,
            identifier,
            secondIdentifier,
            identificationDate,
            identificationMonth,
            identificationYear,
            organism_id,
            sample_id
        };

        console.log(">>> Check data input == ", IdentificationData);
        const newIdentification = await postIdentification(IdentificationData);

        return res.status(201).json({
            message: 'Identification created successfully!',
            data: newIdentification
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
module.exports = { createNewIdentification }