const express = require('express');
const routerAPI = express.Router();
const { createNewGenus} = require("../controller/genus.controller");
const validateGenus = require("../middleware/validateData/validateGenusData");


routerAPI.post('/add', validateGenus, createNewGenus);



module.exports = routerAPI;