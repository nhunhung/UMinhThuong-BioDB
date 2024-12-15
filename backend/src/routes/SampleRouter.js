const express = require('express')
const router = express.Router();
const SampleController = require("../controller/SampleController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.post('/create', authMiddleWare, SampleController.createSample);
router.put('/update/:id', authMiddleWare, SampleController.updateSample);
router.delete('/delete/:id', authMiddleWare, SampleController.deleteSample);
router.get('/get-details/:id', authMiddleWare, SampleController.getDetailSample)
module.exports = router


