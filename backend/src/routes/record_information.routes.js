const express = require('express');
const routerAPI = express.Router();
const { createNewRecordInformation } = require("../controller/record_information.controller");
const validateRecordInformation = require("../middleware/validateRecordInformationData");


routerAPI.post('/add', validateRecordInformation, createNewRecordInformation);



module.exports = routerAPI;