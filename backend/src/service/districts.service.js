const db = require("../config/database");
const { Districts } = db;

const postDistrict = async (districtsData) => {
    try {
        const district = await Districts.create({
            district_name: districtsData.district_name,
            provinces_id: districtsData.provinces_id
         });
        return district;
    } catch (error) {
        console.error("Error creating a new district: ", error.message);
        throw error;
    }
}

module.exports = {
    postDistrict
}