const { body, validationResult } = require('express-validator');
const db = require("../config/database");
const { LocationSample, Organism } = db;

const validateSample = [
    body('dateCollected')
        .notEmpty()
        .withMessage('Date collected is required.')
        .isISO8601()
        .withMessage('Date collected must be a valid date (ISO 8601 format).'),

    body('collector')
        .notEmpty()
        .withMessage('Collector is required.')
        .isString()
        .withMessage('Collector must be a string.')
        .isLength({ max: 100 })
        .withMessage('Collector name must not exceed 100 characters.'),

    body('notes')
        .optional()  // `notes` is optional
        .isString()
        .withMessage('Notes must be a string.')
        .isLength({ max: 500 })
        .withMessage('Notes must not exceed 500 characters.'),

    body('locationsample_id')
        .notEmpty()
        .withMessage('Location sample ID is required.')
        .isInt({ gt: 0 })
        .withMessage('Location sample ID must be a positive integer.')
        .custom(async (value) => {
            // Check if LocationSample exists
            const locationSample = await LocationSample.findByPk(value);
            if (!locationSample) {
                throw new Error('Location sample ID does not exist.');
            }
        }),

    body('organism_id')
        .notEmpty()
        .withMessage('Organism ID is required.')
        .isInt({ gt: 0 })
        .withMessage('Organism ID must be a positive integer.')
        // .custom(async (value) => {
        //     // Check if Organism exists
        //     const organism = await Organism.findByPk(value);
        //     if (!organism) {
        //         throw new Error('Organism ID does not exist.');
        //     }
        // })
    ,

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateSample;
