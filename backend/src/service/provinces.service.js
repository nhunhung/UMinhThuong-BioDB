const Provinces = require("../models/Provinces");

const ERROR_CODES = {
    MISSING_PROVINCE_DATA: 'MISSING_PROVINCE_NAME',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
};

const postaProvince = async (provincesData) => {
    try {
        const province = await Provinces.create({name:provincesData});
        return province;
    } catch (error) {
        console.error("Error creating a new province: ", error.message);
        throw error;
  }
}
module.exports = {
    postaProvince, ERROR_CODES
}