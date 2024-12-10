const express = require('express');
const routerAPI = express.Router();
const uploadMiddleware = require('../middleware/uploadData/uploadMiddleware');
const { uploadController, getDetails, checkExcelData } = require('../controller/upload.controller');
const  uploadRamMiddleware  = require("../middleware/uploadData/uploadStoreRamMiddleware");

routerAPI.post('/add', uploadMiddleware, uploadController);
routerAPI.get('/details', getDetails)

routerAPI.post('/checkData', uploadRamMiddleware, checkExcelData)

module.exports = routerAPI;