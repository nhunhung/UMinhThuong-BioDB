const { body, validationResult } = require('express-validator');
const db = require("../../config/database");
const { Kingdom, Phylum, Class, Order, Family, Genus, ConservationStatus } = db;

// Middleware for validating organism data
const validateOrganism = [
    body("cultivated")
        .optional()
        .isBoolean()
        .withMessage("Cultivated must be a boolean value."),

    body("hostPlantAnimal")
        .optional()
        .isString()
        .withMessage("Host Plant/Animal must be a string.")
        .isLength({ max: 255 })
        .withMessage("Host Plant/Animal must not exceed 255 characters."),

    body("generalNotes")
        .optional()
        .isString()
        .withMessage("General Notes must be a string.")
        .isLength({ max: 255 })
        .withMessage("General Notes must not exceed 255 characters."),

    body("museumNotes")
        .optional()
        .isString()
        .withMessage("Museum Notes must be a string.")
        .isLength({ max: 255 })
        .withMessage("Museum Notes must not exceed 255 characters."),

    body("informationSource")
        .optional()
        .isString()
        .withMessage("Information Source must be a string.")
        .isLength({ max: 255 })
        .withMessage("Information Source must not exceed 255 characters."),

    body("speciesNameLevel1")
        .optional()
        .isString()
        .withMessage("Species Name Level 1 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Species Name Level 1 must not exceed 255 characters."),

    body("firstAuthor")
        .optional()
        .isString()
        .withMessage("First Author must be a string.")
        .isLength({ max: 255 })
        .withMessage("First Author must not exceed 255 characters."),

    body("subspeciesLevel1")
        .optional()
        .isString()
        .withMessage("Subspecies Level 1 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Subspecies Level 1 must not exceed 255 characters."),

    body("speciesNameLevel2")
        .optional()
        .isString()
        .withMessage("Species Name Level 2 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Species Name Level 2 must not exceed 255 characters."),

    body("secondAuthor")
        .optional()
        .isString()
        .withMessage("Second Author must be a string.")
        .isLength({ max: 255 })
        .withMessage("Second Author must not exceed 255 characters."),

    body("subspeciesLevel2")
        .optional()
        .isString()
        .withMessage("Subspecies Level 2 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Subspecies Level 2 must not exceed 255 characters."),

    body("speciesNameLevel3")
        .optional()
        .isString()
        .withMessage("Species Name Level 3 must be a string.")
        .isLength({ max: 255 })
        .withMessage("Species Name Level 3 must not exceed 255 characters."),

    body("thirdAuthor")
        .optional()
        .isString()
        .withMessage("Third Author must be a string.")
        .isLength({ max: 255 })
        .withMessage("Third Author must not exceed 255 characters."),

    body("nomenclatureStatus")
        .optional()
        .isString()
        .withMessage("Nomenclature Status must be a string.")
        .isLength({ max: 255 })
        .withMessage("Nomenclature Status must not exceed 255 characters."),

    body("nomenclatureLevel")
        .optional()
        .isString()
        .withMessage("Nomenclature Level must be a string.")
        .isLength({ max: 255 })
        .withMessage("Nomenclature Level must not exceed 255 characters."),

    body("scientificName")
        .optional()
        .isString()
        .withMessage("Scientific Name must be a string.")
        .isLength({ max: 255 })
        .withMessage("Scientific Name must not exceed 255 characters."),

    body("authorName")
        .optional()
        .isString()
        .withMessage("Author Name must be a string.")
        .isLength({ max: 255 })
        .withMessage("Author Name must not exceed 255 characters."),

    body("commonName")
        .optional()
        .isString()
        .withMessage("Common Name must be a string.")
        .isLength({ max: 255 })
        .withMessage("Common Name must not exceed 255 characters."),

    body("publicationReference")
        .optional()
        .isString()
        .withMessage("Publication Reference must be a string.")
        .isLength({ max: 255 })
        .withMessage("Publication Reference must not exceed 255 characters."),

    body("yearOfAuthorName")
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage(`Year of Author Name must be between 1000 and the current year (${new Date().getFullYear()}).`),

    body("synonymName")
        .optional()
        .isString()
        .withMessage("Synonym Name must be a string.")
        .isLength({ max: 255 })
        .withMessage("Synonym Name must not exceed 255 characters."),

    body("treeForm")
        .optional()
        .isString()
        .withMessage("Tree Form must be a string.")
        .isLength({ max: 255 })
        .withMessage("Tree Form must not exceed 255 characters."),

    body("lifeForm")
        .optional()
        .isString()
        .withMessage("Life Form must be a string.")
        .isLength({ max: 255 })
        .withMessage("Life Form must not exceed 255 characters."),

    body("ecologicalNiche")
        .optional()
        .isString()
        .withMessage("Ecological Niche must be a string.")
        .isLength({ max: 255 })
        .withMessage("Ecological Niche must not exceed 255 characters."),

    body("speciesDescription")
        .optional()
        .isString()
        .withMessage("Species Description must be a string.")
        .isLength({ max: 255 })
        .withMessage("Species Description must not exceed 255 characters."),

    body("habitat")
        .optional()
        .isString()
        .withMessage("Habitat must be a string.")
        .isLength({ max: 255 })
        .withMessage("Habitat must not exceed 255 characters."),

    body("distributionArea")
        .optional()
        .isString()
        .withMessage("Distribution Area must be a string.")
        .isLength({ max: 255 })
        .withMessage("Distribution Area must not exceed 255 characters."),

    body("ethnobotany")
        .optional()
        .isString()
        .withMessage("Ethnobotany must be a string.")
        .isLength({ max: 255 })
        .withMessage("Ethnobotany must not exceed 255 characters."),

    body("usageGroup")
        .optional()
        .isString()
        .withMessage("Usage Group must be a string.")
        .isLength({ max: 255 })
        .withMessage("Usage Group must not exceed 255 characters."),

    body("endangeredRareSpecies")
        .optional()
        .isBoolean()
        .withMessage("Endangered/Rare Species must be a boolean value."),

    body("img")
        .optional()
        .isString()
        .withMessage("Image URL must be a string.")
        .isLength({ max: 255 })
        .withMessage("Image URL must not exceed 255 characters."),

    body("conservationstatus_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Conservation Status ID must be a positive integer.")
        .custom(async (value) => {
            const cs = await ConservationStatus.findByPk(value);
            if (!cs) {
                throw new Error('Conservation status ID does not exist.');
            }
        }),

    body("groupoforganisms_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Group of Organisms ID must be a positive integer.")
        .custom(async (value) => {
            const goo = await db.GroupOfOrganisms.findByPk(value);
            if (!goo) {
                throw new Error('Group of organism ID does not exist.');
            }
        }),

    body("kingdom_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Kingdom ID must be a positive integer.")
        .custom(async (value) => {
            const kd = await Kingdom.findByPk(value);
            if (!kd) {
                throw new Error('Kingdom ID does not exist.');
            }
        }),

    body("phylum_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Phylum ID must be a positive integer.")
        .custom(async (value) => {
            const phy = await Phylum.findByPk(value);
            if (!phy) {
                throw new Error('Phylum ID does not exist.');
            }
        }),

    body("class_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Class ID must be a positive integer.")
        .custom(async (value) => {
            const cl = await Class.findByPk(value);
            if (!cl) {
                throw new Error('Class ID does not exist.');
            }
        }),

    body("order_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Order ID must be a positive integer.")
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) {
                throw new Error('Order ID does not exist.');
            }
        }),

    body("family_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Family ID must be a positive integer.")
        .custom(async (value) => {
            const fam = await Family.findByPk(value);
            if (!fam) {
                throw new Error('Family ID does not exist.');
            }
        }),

    body("genus_id")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Genus ID must be a positive integer.")
        .custom(async (value) => {
            const genus = await Genus.findByPk(value);
            if (!genus) {
                throw new Error('Genus ID does not exist.');
            }
        }),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateOrganism;
