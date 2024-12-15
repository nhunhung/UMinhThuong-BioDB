const express = require('express');
const routerAPI = express.Router();
const uploadMiddleware = require('../middleware/uploaData/uploadMiddleware');
const uploadRamMiddleware = require("../middleware/uploaData/uploadStoreRamMiddleware");

const { uploadController, getDetails, checkExcelData } = require('../controller/UploadExcelController');

routerAPI.post('/add', uploadMiddleware, uploadController);


routerAPI.get('/details', getDetails)

routerAPI.post('/checkData', uploadRamMiddleware, checkExcelData)

module.exports = routerAPI;