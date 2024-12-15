const express = require('express')
const router = express.Router();
const WardsController = require("../controller/WardsController");
const { authMiddleWare, } = require('../middleware/authMiddleware');
router.get('/get-details/:id', authMiddleWare, WardsController.getDetailWards);
router.post('/create', authMiddleWare, WardsController.createWards);
router.put('/update/:id', authMiddleWare, WardsController.updateWards);
router.delete('/delete/:id', authMiddleWare, WardsController.deleteWards);

module.exports = router