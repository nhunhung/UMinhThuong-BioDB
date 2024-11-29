const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Provinces, Districts, Wards } = db;

const validateLocationSample = [
    body('country')
        .optional()
        .isString()
        .withMessage('Country must be a string.')
        .isLength({ max: 255 })
        .withMessage('Country must not exceed 255 characters.'),

    body('collectionVillage')
        .optional()
        .isString()
        .withMessage('Collection Village must be a string.')
        .isLength({ max: 255 })
        .withMessage('Collection Village must not exceed 255 characters.'),

    body('location')
        .optional()
        .isString()
        .withMessage('Location must be a string.')
        .isLength({ max: 255 })
        .withMessage('Location must not exceed 255 characters.'),

    body('locationNotes')
        .optional()
        .isString()
        .withMessage('Location Notes must be a string.')
        .isLength({ max: 255 })
        .withMessage('Location Notes must not exceed 255 characters.'),

    body('latitude')
        .optional()
        .isFloat()
        .withMessage('Latitude must be a valid float.'),

    body('northSouth')
        .optional()
        .isString()
        .withMessage('North/South must be a string.')
        .isLength({ max: 255 })
        .withMessage('North/South must not exceed 255 characters.'),

    body('longitude')
        .optional()
        .isFloat()
        .withMessage('Longitude must be a valid float.'),

    body('eastWest')
        .optional()
        .isString()
        .withMessage('East/West must be a string.')
        .isLength({ max: 255 })
        .withMessage('East/West must not exceed 255 characters.'),

    body('elevation')
        .optional()
        .isFloat()
        .withMessage('Elevation must be a valid float.'),

    body('maxElevationRange')
        .optional()
        .isFloat()
        .withMessage('Max Elevation Range must be a valid float.'),

    body('elevationUnit')
        .optional()
        .isString()
        .withMessage('Elevation Unit must be a string.')
        .isLength({ max: 255 })
        .withMessage('Elevation Unit must not exceed 255 characters.'),

    body('vn2000Longitude')
        .optional()
        .isFloat()
        .withMessage('VN2000 Longitude must be a valid float.'),

    body('vn2000Latitude')
        .optional()
        .isFloat()
        .withMessage('VN2000 Latitude must be a valid float.'),

    body('provinces_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Province ID must be a positive integer.')
        .custom(async (value) => {
            const province = await Provinces.findByPk(value);
            if (!province) {
                throw new Error('Province ID does not exist.');
            }
        }),

    body('districts_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('District ID must be a positive integer.')
        .custom(async (value) => {
            const district = await Districts.findByPk(value);
            if (!district) {
                throw new Error('District ID does not exist.');
            }
        }),
    body('wards_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Ward ID must be a positive integer.')
        .custom(async (value) => {
            const ward = await Wards.findByPk(value);
            if (!ward) {
                throw new Error('Ward ID does not exist.');
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
