const { body, validationResult } = require('express-validator');

const validateConservationStatus = [
    body('endangeredLevel')
        .notEmpty()
        .withMessage('Endangered Level is required.')
        .isString()
        .withMessage('Endangered Level must be a string.'),

    body('redListWorld')
        .notEmpty()
        .withMessage('Red List World is required.')
        .isString()
        .withMessage('Red List World must be a string.'),

    body('redListVersion')
        .notEmpty()
        .withMessage('Red List Version is required.')
        .isString()
        .withMessage('Red List Version must be a string.'),

    body('vietnamRedBook')
        .notEmpty()
        .withMessage('Vietnam Red Book is required.')
        .isString()
        .withMessage('Vietnam Red Book must be a string.'),

    body('decree81')
        .notEmpty()
        .withMessage('Decree81 is required.')
        .isString()
        .withMessage('Decree81 must be a string.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateConservationStatus;
