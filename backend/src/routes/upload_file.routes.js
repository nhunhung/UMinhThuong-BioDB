const express = require('express');
const routerAPI = express.Router();
const uploadMiddleware  = require('../middleware/uploadData/uploadMiddleware');
const { uploadController, getDetails } = require('../controller/upload.controller');

routerAPI.post('/add', uploadMiddleware, uploadController);
routerAPI.get('/details',getDetails)


module.exports = routerAPI;