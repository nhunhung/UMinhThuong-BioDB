const express = require('express');
const routerAPI = express.Router();
const { createNewPhylum } = require("../controller/phylums.controller");
const validatePhylums = require("../middleware/validateData/validatePhylumsData");


routerAPI.post('/add', validatePhylums, createNewPhylum);



module.exports = routerAPI;