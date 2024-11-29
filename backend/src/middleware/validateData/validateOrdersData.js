const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Class } = db;

const validateOrders = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('class_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Class ID must be a positive integer.')
        .custom(async (value) => {
            // Kiểm tra nếu districts_id có tồn tại trong database
            const cl = await Class.findByPk(value);
            if (!cl) {
                throw new Error('Class ID does not exist.');
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

module.exports = validateOrders;
