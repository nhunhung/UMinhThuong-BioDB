const db = require("../config/database");
const { ConservationStatus } = db;

const postConservationStatus = async (conservationStatusData) => {
    try {
        const conservationStatus = await ConservationStatus.create({
            endangeredLevel: conservationStatusData.endangeredLevel,
            redListWorld: conservationStatusData.redListWorld,
            redListVersion: conservationStatusData.redListVersion,
            vietnamRedBook: conservationStatusData.vietnamRedBook,
            decree81: conservationStatusData.decree81
        });
        return conservationStatus;
    } catch (error) {
        console.error("Error creating a new conservation status: ", error.message);
        throw error;
    }
}

module.exports = {
    postConservationStatus
}