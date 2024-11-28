const db = require("../config/database");
const { Wards } = db;

const postWard= async (wardsData) => {
    try {
        const ward = await Wards.create({
            name: wardsData.name,
            districts_id: wardsData.districts_id
        });
        return ward;
    } catch (error) {
        console.error("Error creating a new ward: ", error.message);
        throw error;
    }
}

module.exports = {
    postWard
}