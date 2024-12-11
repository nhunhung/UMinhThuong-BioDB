const { body } = require('express-validator');

const validateProvince = [
    body('name')
        .isString().withMessage('Province name must be a string')
        .notEmpty().withMessage('Province name cannot be empty')
        .isLength({ min: 3, max: 255 }).withMessage('Province name must be between 3 and 255 characters')
];

module.exports = validateProvince;
