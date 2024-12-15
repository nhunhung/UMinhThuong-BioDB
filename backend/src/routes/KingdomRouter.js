const express = require('express')
const router = express.Router();
const KingdomController = require("../controller/KingdomController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, KingdomController.createKingdom);
router.put('/update/:id', authMiddleWare, KingdomController.updateKingdom);
router.delete('/delete/:id', authMiddleWare, KingdomController.deleteKingdom);
module.exports = router