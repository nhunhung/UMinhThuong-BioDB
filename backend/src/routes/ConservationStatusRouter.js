const express = require('express')
const router = express.Router();
const ConservationStatusController = require("../controller/ConservationStatusController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, ConservationStatusController.createConservationStatus);
router.put('/update/:id', authMiddleWare, ConservationStatusController.updateConservationStatus);
router.delete('/delete/:id', authMiddleWare, ConservationStatusController.deleteConservationStatus);
router.get('/get-details/:id', authMiddleWare, ConservationStatusController.getDetailConservationStatus)
router.get('/get-all', ConservationStatusController.getAllConservationStatus)
module.exports = router