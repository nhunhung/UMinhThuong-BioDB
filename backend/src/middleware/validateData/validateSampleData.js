const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { LocationSample, Organism } = db;

const validateSample = [
    body("locationsample_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Location Sample ID must be a positive integer.")
        .custom(async (value) => {
            const locationSample = await LocationSample.findByPk(value);
            if (!locationSample) {
                throw new Error("Location Sample ID does not exist.");
            }
        }),

    body("organism_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Organism ID must be a positive integer.")
        .custom(async (value) => {
            const organism = await Organism.findByPk(value);
            if (!organism) {
                throw new Error("Organism ID does not exist.");
            }
        }),

    body("recordNumber1")
        .optional()
        .isString()
        .withMessage("Record Number 1 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Record Number 1 must not exceed 255 characters."),

    body("project")
        .optional()
        .isString()
        .withMessage("Project must be a string.")
        .isLength({ max: 255 })
        .withMessage("Project must not exceed 255 characters."),

    body("recordType")
        .optional()
        .isString()
        .withMessage("Record Type must be a string.")
        .isLength({ max: 255 })
        .withMessage("Record Type must not exceed 255 characters."),

    body("museumCode")
        .optional()
        .isString()
        .withMessage("Museum Code must be a string.")
        .isLength({ max: 255 })
        .withMessage("Museum Code must not exceed 255 characters."),

    body("specimenCode")
        .optional()
        .isString()
        .withMessage("Specimen Code must be a string.")
        .isLength({ max: 255 })
        .withMessage("Specimen Code must not exceed 255 characters."),

    body("typeSpecimen")
        .optional()
        .isString()
        .withMessage("Type Specimen must be a string.")
        .isLength({ max: 255 })
        .withMessage("Type Specimen must not exceed 255 characters."),

    body("recordNumber2")
        .optional()
        .isString()
        .withMessage("Record Number 2 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Record Number 2 must not exceed 255 characters."),

    body("specimenQuantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Specimen Quantity must be a non-negative integer."),

    body("primaryCollector")
        .optional()
        .isString()
        .withMessage("Primary Collector must be a string.")
        .isLength({ max: 255 })
        .withMessage("Primary Collector must not exceed 255 characters."),

    body("collaborator")
        .optional()
        .isString()
        .withMessage("Collaborator must be a string.")
        .isLength({ max: 255 })
        .withMessage("Collaborator must not exceed 255 characters."),

    body("recordDate")
        .optional()
        .isISO8601()
        .withMessage("Record Date must be a valid ISO8601 date."),

    body("recordMonth")
        .optional()
        .isInt({ min: 1, max: 12 })
        .withMessage("Record Month must be an integer between 1 and 12."),

    body("recordYear")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage(
            `Record Year must be an integer between 1900 and the current year (${new Date().getFullYear()}).`
        ),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateSample;
