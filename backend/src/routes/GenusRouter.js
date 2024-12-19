// const express = require('express')
// const router = express.Router();
// const GenusController = require("../controller/GenusController")
// console.log(GenusController.createGenus);
// router.post('/create', GenusController.createGenus);
// router.put('/update/:id', GenusController.updateGenus);
// router.delete('/delete/:id', GenusController.deleteGenus);
// module.exports = router

const express = require('express');
const router = express.Router();
const GenusController = require('../controller/GenusController');
const { authMiddleWare } = require('../middleware/authMiddleware');

// Các route trong GenusRouter.js
router.post('/create', authMiddleWare, GenusController.createGenus);
router.put('/update/:id', authMiddleWare, GenusController.updateGenus);
router.delete('/delete/:id', authMiddleWare, GenusController.deleteGenus);
router.get('/get-details/:id', authMiddleWare, GenusController.getDetailGenus)
module.exports = router;
