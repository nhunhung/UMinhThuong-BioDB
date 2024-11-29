const db = require("../config/database");
const { Identification } = db;

const postIdentification = async (identificationData) => {
    try {
        const identification = await Identification.create({
            identificationStatus: identificationData.identificationStatus,
            reference: identificationData.reference,
            identifier: identificationData.identifier,
            secondIdentifier: identificationData.secondIdentifier,
            identificationDate: identificationData.identificationDate,
            identificationMonth: identificationData.identificationMonth,
            identificationYear: identificationData.identificationYear,
            organism_id: identificationData.organism_id,
            sample_id: identificationDatax.sample_id
        });
        return identification;
    } catch (error) {
        console.error("Error creating a new indentification: ", error.message);
        throw error;
    }
}

module.exports = {
    postIdentification
}