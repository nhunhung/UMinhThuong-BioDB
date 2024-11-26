const express = require('express');
const routerAPI = express.Router();
const {getAllAccounts}= require("../controller/provinces.controller");


routerAPI.get('/add', getAllAccounts);


module.exports =  routerAPI;