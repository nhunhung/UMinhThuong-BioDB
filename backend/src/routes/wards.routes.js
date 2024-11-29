const express = require('express');
const routerAPI = express.Router();
const { createNewWard } = require("../controller/wards.controller");
const validateWards = require("../middleware/validateData/validateWardsData");


routerAPI.post('/add', validateWards, createNewWard);



module.exports = routerAPI;