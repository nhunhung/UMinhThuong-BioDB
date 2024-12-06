const express = require('express')
const router = express.Router();
const provincesController = require("../controller/ProvincesController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, provincesController.createProvinces);
router.put('/update/:id', authMiddleWare, provincesController.updateProvinces);
router.delete('/delete/:id', authMiddleWare, provincesController.deleteProvinces);
module.exports = router