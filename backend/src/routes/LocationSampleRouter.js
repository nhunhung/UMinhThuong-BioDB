const express = require('express')
const router = express.Router();
const LocationSampleController = require("../controller/LocationSampleController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, LocationSampleController.createLocationSample);
router.put('/update/:id', authMiddleWare, LocationSampleController.updateLocationSample);
router.delete('/delete/:id', authMiddleWare, LocationSampleController.deleteLocationSample);
router.get('/get-details/:id', authMiddleWare, LocationSampleController.getDetailLocationSample)
module.exports = router