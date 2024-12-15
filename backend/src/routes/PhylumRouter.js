const express = require('express')
const router = express.Router();
const PhylumController = require("../controller/PhylumController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, PhylumController.createPhylum);
router.put('/update/:id', authMiddleWare, PhylumController.updatePhylum);
router.delete('/delete/:id', authMiddleWare, PhylumController.deletePhylum);
module.exports = router