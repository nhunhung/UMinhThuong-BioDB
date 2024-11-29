const db = require("../config/database");
const { ConservationStatus } = db;

const postConservationStatus = async (conservationStatusData) => {
    try {
        const conservationStatus = await ConservationStatus.create({
            iucnRedList: conservationStatusData.iucnRedList,
            circular35: conservationStatusData.circular35 ,
            endemic: conservationStatusData.endemic ,
            decree64: conservationStatusData.decree64,
            decree81: conservationStatusData.decree81 ,
            vietnamRedList: conservationStatusData.vietnamRedList,
            citesSpecies: conservationStatusData.citesSpecies ,
            iucnRedListVersion: conservationStatusData.iucnRedListVersion ,
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