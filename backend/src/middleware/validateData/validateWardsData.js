const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Districts } = db;

const validateWards = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('districts_id')
        .notEmpty()
        .withMessage('District ID is required.')
        .isInt({ gt: 0 })
        .withMessage('District ID must be a positive integer.')
        .custom(async (value) => {
            // Kiểm tra nếu districts_id có tồn tại trong database
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

module.exports = validateWards;
