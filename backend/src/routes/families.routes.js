const express = require('express');
const routerAPI = express.Router();
const { createNewFamily } = require("../controller/families.controller");
const validateFamilies = require("../middleware/validateData/validateFamiliesData");


routerAPI.post('/add', validateFamilies, createNewFamily);



module.exports = routerAPI;