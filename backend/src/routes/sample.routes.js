const express = require('express');
const routerAPI = express.Router();
const { createNewSample} = require("../controller/sample.controller");
const validateSample = require("../middleware/validateSampleData");


routerAPI.post('/add', validateSample, createNewSample);



module.exports = routerAPI;