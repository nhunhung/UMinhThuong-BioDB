const { body, validationResult } = require('express-validator');
const db = require("../config/database");
const { Provinces, Districts, Wards } = db;

const validateLocationSample = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('latitude')
        .notEmpty()
        .withMessage('Latitude is required.')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be a float between -90 and 90.'),
    
    body('longitude')
        .notEmpty()
        .withMessage('Longitude is required.')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be a float between -180 and 180.'),
    
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string.')
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters.'),
    
    body('wards_id')
        .notEmpty()
        .withMessage('Ward ID is required.')
        .isInt({ gt: 0 })
        .withMessage('Ward ID must be a positive integer.')
        .custom(async (value) => {
            const province = await Provinces.findByPk(value);
            if (!province) {
                throw new Error('Ward ID does not exist.');
            }
        }),

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
    
    body('districts_id')
        .notEmpty()
        .withMessage('District ID is required.')
        .isInt({ gt: 0 })
        .withMessage('District ID must be a positive integer.')
        .custom(async (value) => {
            const district = await Districts.findByPk(value);
            if (!district) {
                throw new Error('District ID does not exist.');
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

module.exports = validateLocationSample;
