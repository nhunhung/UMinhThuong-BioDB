const express = require('express')
const router = express.Router();
const IdentificationController = require("../controller/IdentificationController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, IdentificationController.createIdentification);
router.put('/update/:id', authMiddleWare, IdentificationController.updateIdentification);
router.delete('/delete/:id', authMiddleWare, IdentificationController.deleteIdentification);
router.get('/get-details/:id', authMiddleWare, IdentificationController.getDetailIdentification)
module.exports = router

