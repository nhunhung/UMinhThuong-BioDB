const express = require('express')
const router = express.Router();
const IdentificationController = require("../controller/IdentificationController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, IdentificationController.createIdentification);
router.put('/update/:id', authMiddleWare, IdentificationController.updateIdentification);
router.delete('/delete/:id', authMiddleWare, IdentificationController.deleteIdentification);
module.exports = router

