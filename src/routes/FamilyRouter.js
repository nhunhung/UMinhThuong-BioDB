const express = require('express')
const router = express.Router();
const FamilyController = require("../controller/FamilyController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, FamilyController.createFamily);
router.put('/update/:id', authMiddleWare, FamilyController.updateFamily);
router.delete('/delete/:id', authMiddleWare, FamilyController.deleteFamily);
module.exports = router