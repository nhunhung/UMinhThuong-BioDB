const { body, validationResult } = require('express-validator');
const { Organism, Sample } = require('../../config/database');

const validateIdentification = [
    body('identificationStatus')
        .optional()
        .isString()
        .withMessage('Identification Status must be a string.')
        .isLength({ max: 255 })
        .withMessage('Identification Status must not exceed 255 characters.'),

    // Tài liệu: reference
    body('reference')
        .optional()
        .isString()
        .withMessage('Reference must be a string.')
        .isLength({ max: 255 })
        .withMessage('Reference must not exceed 255 characters.'),

    // Người định danh: identifier
    body('identifier')
        .optional()
        .isString()
        .withMessage('Identifier must be a string.')
        .isLength({ max: 255 })
        .withMessage('Identifier must not exceed 255 characters.'),

    // Người định danh thứ 2: secondIdentifier
    body('secondIdentifier')
        .optional()
        .isString()
        .withMessage('Second Identifier must be a string.')
        .isLength({ max: 255 })
        .withMessage('Second Identifier must not exceed 255 characters.'),

    // Ngày định danh: identificationDate
    body('identificationDate')
        .optional()
        .isISO8601()
        .withMessage('Identification Date must be a valid date in the format YYYY-MM-DD.'),

    // Tháng định danh: identificationMonth
    body('identificationMonth')
        .optional()
        .isInt({ min: 1, max: 12 })
        .withMessage('Identification Month must be an integer between 1 and 12.'),

    // Năm định danh: identificationYear
    body('identificationYear')
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage(`Identification Year must be a valid year between 1900 and ${new Date().getFullYear()}.`),

    body('organism_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Province ID must be a positive integer.')
        .custom(async (value) => {
            const organism = await Organism.findByPk(value);
            if (!organism) {
                throw new Error('Organism ID does not exist.');
            }
        }),
    body('sample_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Sample ID must be a positive integer.')
        .custom(async (value) => {
            const sample = await Sample.findByPk(value);
            if (!sample) {
                throw new Error('Sample ID does not exist.');
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateIdentification;
