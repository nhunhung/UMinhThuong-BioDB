const express = require('express');
const routerAPI = express.Router();
const { createNewConservationStatus } = require("../controller/conservation_status.controller");
const validateConservationStatus = require("../middleware/validateConservationStatusData");


routerAPI.post('/add', validateConservationStatus, createNewConservationStatus);



module.exports = routerAPI;