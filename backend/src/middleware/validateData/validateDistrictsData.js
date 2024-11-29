const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Provinces } = db;

const validateDistricts = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('provinces_id')
        .notEmpty()
        .withMessage('Province ID is required.')
        .isInt({ gt: 0 })
        .withMessage('Province ID must be a positive integer.')
        .custom(async (value) => {
            const province = await Provinces.findByPk(value);
            if (!province) {
                throw new Error('Province ID does not exist.');
            }
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateDistricts;
