const db = require("../config/database");
const { Family } = db;

const postFamily = async (familyData) => {
    try {
        const family = await Family.create({

            family_name: familyData.family_name,
            order_id: familyData.order_id
        });
        return family;
    } catch (error) {
        console.error("Error creating a new family: ", error.message);
        throw error;
    }
}

module.exports = {
    postFamily
}