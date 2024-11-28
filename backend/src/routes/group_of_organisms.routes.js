const express = require('express');
const routerAPI = express.Router();
const { createNewGroupOfOrganism } = require("../controller/group_of_organisms.controller");
const validateGroupOfOrganisms = require("../middleware/validateGroupOfOrganismsData");


routerAPI.post('/add', validateGroupOfOrganisms, createNewGroupOfOrganism);



module.exports = routerAPI;