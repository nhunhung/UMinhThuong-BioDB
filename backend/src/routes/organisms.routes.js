const express = require('express');
const routerAPI = express.Router();
const { createNewOrganism } = require("../controller/organisms.controller");
const validateOrganism = require("../middleware/validateData/validateOrganismsData");
const file_uploadMiddleware = require("../middleware/uploadData/image_upload")


routerAPI.post('/add', file_uploadMiddleware, validateOrganism, createNewOrganism);



module.exports = routerAPI;