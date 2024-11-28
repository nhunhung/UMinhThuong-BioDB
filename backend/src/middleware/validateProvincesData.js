const { body, validationResult } = require('express-validator');

const validateProvince = [
    body('name')
        .isString().withMessage('Province name must be a string')
        .notEmpty().withMessage('Province name cannot be empty')
        .isLength({ min: 3, max: 255 }).withMessage('Province name must be between 3 and 255 characters'),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "fail to validate data",
                errors: errors.array()
            });
        }
        next();
    },

];

module.exports = validateProvince;
