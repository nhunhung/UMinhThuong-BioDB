const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Phylum } = db;

const validateClasses = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('phylum_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Phylum ID must be a positive integer.')
        .custom(async (value) => {
            const phylum = await Phylum.findByPk(value);
            if (!phylum) {
                throw new Error('Phylum ID does not exist.');
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

module.exports = validateClasses;
