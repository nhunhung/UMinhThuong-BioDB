const express = require('express');
const routerAPI = express.Router();
const { createNewLocationSample } = require("../controller/location_samples.controller");
const validateLocationSample = require("../middleware/validateLocationSamplesData");


routerAPI.post('/add', validateLocationSample, createNewLocationSample);



module.exports = routerAPI;