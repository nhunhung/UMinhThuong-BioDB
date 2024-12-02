const express = require("express");
const routerAPI = express.Router();
const { createNewGroupOfOrganism, removeGroupOfOrganism } = require("../controller/group_of_organisms.controller");
const validateGroupOfOrganisms = require("../middleware/validateData/validateGroupOfOrganismsData");
const file_uploadMiddleware = require("../middleware/file-upload")


routerAPI.post('/add', file_uploadMiddleware, validateGroupOfOrganisms, createNewGroupOfOrganism);
routerAPI.delete("/remove/:groupoforganisms_id", removeGroupOfOrganism);




module.exports = routerAPI;