const { body, validationResult } = require('express-validator');

const validateGroupOfOrganisms = [
    body('logo')
        .notEmpty()
        .withMessage('Logo is required.')
        .isString()
        .withMessage('Logo must be a string.'),

    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Name must be a string.')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateGroupOfOrganisms;
