const express = require('express')
const router = express.Router();
const roleController = require("../controller/RoleController");
const { authMiddleWareAdmin } = require('../middleware/authMiddleware');
router.post('/create', roleController.createRole);
router.put('/update/:id', authMiddleWareAdmin, roleController.updateRole);
router.delete('/delete/:id', authMiddleWareAdmin, roleController.deleteRole);
router.get('/get-details/:id', authMiddleWareAdmin, roleController.getDetailRole)
module.exports = router