const express = require('express');
const routerAPI = express.Router();
const { createNewIdentification } = require("../controller/identification.controller");
const validateIdentification = require("../middleware/validateData/validateIdentificationData");


routerAPI.post('/add', validateIdentification, createNewIdentification);



module.exports = routerAPI;