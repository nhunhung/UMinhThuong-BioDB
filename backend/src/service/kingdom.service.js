const db = require("../config/database");
const { Kingdom } = db;

const postKingdom= async (kingdomData) => {
    try {
        const kingdom = await Kingdom.create({
           name:kingdomData.name
        });
        return kingdom;
    } catch (error) {
        console.error("Error creating a new kingdom: ", error.message);
        throw error;
    }
}

module.exports = {
    postKingdom
}