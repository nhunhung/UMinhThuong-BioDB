const { postProvince, ERROR_CODES } = require("../service/provinces.service")
const { validationResult } = require('express-validator');

const createANewProvince = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    try {
        const provincesData = req.body.name;
        console.log(">>> Check name == ", provincesData);
        const newProvince = await postProvince(provincesData);
       
        return res.status(201).json({ message: 'Province created successfully!', data: newProvince });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  
 
}
module.exports = { createANewProvince }