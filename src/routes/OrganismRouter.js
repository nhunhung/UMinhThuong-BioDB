const express = require('express')
const router = express.Router();
const OrganismController = require("../controller/OrganismController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, OrganismController.createOrganism);
router.put('/update/:id', authMiddleWare, OrganismController.updateOrganism);
router.delete('/delete/:id', authMiddleWare, OrganismController.deleteOrganism);
module.exports = router