const express = require('express')
const router = express.Router();
const FileUpLoadController = require("../controller/FileUploadController")
router.post('/create', FileUpLoadController.createFileUpLoad);
router.put('/update/:id', FileUpLoadController.updateFileUpLoad);
router.delete('/delete/:id', FileUpLoadController.deleteFileUpLoad);
router.get('/get-details/:id', FileUpLoadController.getDetailFileUpLoad)
module.exports = router