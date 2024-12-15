const express = require('express')
const router = express.Router();
const DistrictsController = require("../controller/DistrictsController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, DistrictsController.createDistricts);
router.put('/update/:id', authMiddleWare, DistrictsController.updateDistricts);
router.delete('/delete/:id', authMiddleWare, DistrictsController.deleteDistricts);
router.get('/get-details/:id', authMiddleWare, DistrictsController.getDetailDistricts)
module.exports = router