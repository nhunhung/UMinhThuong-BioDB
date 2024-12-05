const express = require("express");
const routerAPI = express.Router();
const { createNewGroupOfOrganism, removeGroupOfOrganism } = require("../controller/group_of_organisms.controller");
const validateGroupOfOrganisms = require("../middleware/validateData/validateGroupOfOrganismsData");
const uploadlogoMiddleware = require("../middleware/uploadData/image_upload");



routerAPI.post('/add', uploadlogoMiddleware ,validateGroupOfOrganisms, createNewGroupOfOrganism);
routerAPI.delete("/remove/:groupoforganisms_id", removeGroupOfOrganism);




module.exports = routerAPI;