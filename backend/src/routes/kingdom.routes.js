const express = require('express');
const routerAPI = express.Router();
const { createNewKingdom } = require("../controller/kingdom.controller");
const validateKingdom = require("../middleware/validateData/validateKingdomData");


routerAPI.post('/add', validateKingdom, createNewKingdom);



module.exports = routerAPI;