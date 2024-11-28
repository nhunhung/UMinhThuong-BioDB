const express = require('express');
const routerAPI = express.Router();
const { createNewProvince } = require("../controller/provinces.controller");
const validateProvince = require("../middleware/validateProvincesData");


routerAPI.post('/add', validateProvince, createNewProvince);



module.exports = routerAPI;