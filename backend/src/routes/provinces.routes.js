const express = require('express');
const routerAPI = express.Router();
const { createANewProvince } = require("../controllers/provinces.controller");
const validateProvince = require("../middlewares/validateProvincesData");


routerAPI.post('/add', validateProvince, createANewProvince);



module.exports = routerAPI;