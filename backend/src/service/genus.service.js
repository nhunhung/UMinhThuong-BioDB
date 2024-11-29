const db = require("../config/database");
const { Genus } = db;

const postGenus = async (genusData) => {
    try {
        const genus = await Genus.create({
       
            name: genusData.name,
            family_id: genusData.family_id
        });
        return genus;
    } catch (error) {
        console.error("Error creating a new genus: ", error.message);
        throw error;
    }
}

module.exports = {
    postGenus
}