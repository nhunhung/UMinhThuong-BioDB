const db = require("../config/database")
const { Provinces } = db;
const postProvince = async (provincesData) => {
    try {
        const province = await Provinces.create({ province_name: provincesData });
        return province;
    } catch (error) {
        console.error("Error creating a new province: ", error.message);
        throw error;
    }
}

module.exports = {
    postProvince
}