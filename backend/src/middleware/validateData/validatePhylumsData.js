const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Kingdom } = db;

const validatePhylums = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('kingdom_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Kingdom ID must be a positive integer.')
        .custom(async (value) => {
            const kingdom = await Kingdom.findByPk(value);
            if (!kingdom) {
                throw new Error('Kingdom ID does not exist.');
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

module.exports = validatePhylums;
