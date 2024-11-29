const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Orders } = db;

const validateFamilies= [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    body('order_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Order ID must be a positive integer.')
        .custom(async (value) => {
            // Kiểm tra nếu districts_id có tồn tại trong database
            const order = await Orders.findByPk(value);
            if (!order) {
                throw new Error('Order ID does not exist.');
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

module.exports = validateFamilies;
