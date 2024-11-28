const { body, validationResult } = require('express-validator');
const db = require("../config/database");
const { Provinces, Districts, Wards } = db;

const validateRecordInformation = [
    body('recorder')
        .notEmpty()
        .withMessage('Recorder is required.')
        .isString()
        .withMessage('Recorder must be a string.'),

    body('recordId1')
        .notEmpty()
        .withMessage('Record ID 1 is required.')
        .isString()
        .withMessage('Record ID 1 must be a string.'),

    body('recordType')
        .notEmpty()
        .withMessage('Record Type is required.')
        .isString()
        .withMessage('Record Type must be a string.'),

    body('sampleQuantity')
        .isInt({ gt: 0 })
        .withMessage('Sample Quantity must be a positive integer.'),

    body('recordDate')
        .isDate()
        .withMessage('Record Date must be a valid date (YYYY-MM-DD).'),

    body('projectNameRelatedtoTheSample')
        .notEmpty()
        .withMessage('Project Name Related to the Sample is required.')
        .isInt({ gt: 0 })
        .withMessage('Sample Quantity must be a positive integer.'),
    
    body('recorded')
        .notEmpty()
        .withMessage('Recorded is required.')
        .isString()
        .withMessage('Recorded must be a string.'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateRecordInformation;
