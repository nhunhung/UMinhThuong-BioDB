const db = require("../config/database");
const { Phylum } = db;

const postPhylum = async (phylumsData) => {
    try {
        const phylum = await Phylum.create({
            name: phylumsData.name,
            kingdom_id: phylumsData.kingdom_id,

        });
        return phylum;
    } catch (error) {
        console.error("Error creating a new phylum: ", error.message);
        throw error;
    }
}

module.exports = {
    postPhylum
}