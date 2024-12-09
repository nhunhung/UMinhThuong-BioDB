const Provinces = require("../models/ProvincesModel")

const ERROR_CODES = {
    MISSING_PROVINCE_DATA: 'MISSING_PROVINCE_NAME',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
};

const postProvince = async (provincesData) => {
    try {
        const province = await Provinces.create({ name: provincesData });
        return province;
    } catch (error) {
        console.error("Error creating a new province: ", error.message);
        throw error;
    }
}

module.exports = {
    postProvince, ERROR_CODES
}