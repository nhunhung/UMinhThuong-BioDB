const { body, validationResult } = require('express-validator');

const validateConservationStatus = [
    // Sách đỏ Thế giới: iucnRedList
    body('iucnRedList')
        .optional()
        .isBoolean()
        .withMessage('IUCN Red List must be a boolean value (true/false).'),

    // Phiên bản sách đỏ Thế giới: iucnRedListVersion
    body('iucnRedListVersion')
        .optional()
        .isString()
        .withMessage('IUCN Red List Version must be a string.')
        .isLength({ max: 255 })
        .withMessage('IUCN Red List Version must not exceed 255 characters.'),

    // Thương mại quốc tế các loài động vật nguy cấp: citesSpecies
    body('citesSpecies')
        .optional()
        .isBoolean()
        .withMessage('CITES Species must be a boolean value (true/false).'),

    // Sách đỏ Việt Nam: vietnamRedList
    body('vietnamRedList')
        .optional()
        .isBoolean()
        .withMessage('Vietnam Red List must be a boolean value (true/false).'),

    // Nghị định số 81/2021/NĐ-CP: decree81
    body('decree81')
        .optional()
        .isString()
        .withMessage('Decree 81 must be a string.')
        .isLength({ max: 255 })
        .withMessage('Decree 81 must not exceed 255 characters.'),

    // Nghị định số 64/2019/NĐ-CP: decree64
    body('decree64')
        .optional()
        .isString()
        .withMessage('Decree 64 must be a string.')
        .isLength({ max: 255 })
        .withMessage('Decree 64 must not exceed 255 characters.'),

    // Đặc hữu: endemic
    body('endemic')
        .optional()
        .isBoolean()
        .withMessage('Endemic must be a boolean value (true/false).'),

    // Thông tư 35/2018/TT-BTNMT: circular35
    body('circular35')
        .optional()
        .isString()
        .withMessage('Circular 35 must be a string.')
        .isLength({ max: 255 })
        .withMessage('Circular 35 must not exceed 255 characters.'),
    

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateConservationStatus;
