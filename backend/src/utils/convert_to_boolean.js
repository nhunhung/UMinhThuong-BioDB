const convertToBoolean = (value) => {
    if (value === "true" || value === "1" || value === "TRUE") return true;
    if (value === "false" || value === "0" || value === "FALSE") return false;
};

// module.exports = { convertToBoolean }