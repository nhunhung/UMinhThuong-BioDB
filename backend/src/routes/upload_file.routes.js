const express = require('express');
const routerAPI = express.Router();
const uploadMiddleware  = require('../middleware/uploadData/uploadMiddleware');
const { uploadController, getDetails } = require('../controller/upload.controller');
const file_uploadMiddleware = require("../middleware/uploadData/image_upload")

routerAPI.post('/add', file_uploadMiddleware, uploadMiddleware, uploadController);
routerAPI.get('/details',getDetails)


module.exports = routerAPI;