const express = require('express');
const routerAPI = express.Router();
const { createNewDistrict } = require("../controller/districts.controller");
const validateDistricts = require("../middleware/validateDistrictsData");


routerAPI.post('/add', validateDistricts, createNewDistrict);



module.exports = routerAPI;