const express = require('express');
const routerAPI = express.Router();
const { createNewClass } = require("../controller/classes.controller");
const validateClasses = require("../middleware/validateData/validateClassesData");


routerAPI.post('/add', validateClasses, createNewClass);



module.exports = routerAPI;