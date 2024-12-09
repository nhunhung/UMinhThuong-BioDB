const express = require('express')
const router = express.Router();
const ConservationStatusController = require("../controller/ConservationStatusController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, ConservationStatusController.createConservationStatus);
router.put('/update/:id', authMiddleWare, ConservationStatusController.updateConservationStatus);
router.delete('/delete/:id', authMiddleWare, ConservationStatusController.deleteConservationStatus);
module.exports = router