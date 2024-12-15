const express = require('express')
const router = express.Router();
const groupoforganismsController = require("../controller/GroupOfOrganismsController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, groupoforganismsController.createGroupOfOrganisms);
router.put('/update/:id', authMiddleWare, groupoforganismsController.updateGroupOfOrganisms);
router.delete('/delete/:id', authMiddleWare, groupoforganismsController.deleteGroupOfOrganisms);
module.exports = router