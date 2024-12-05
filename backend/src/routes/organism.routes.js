const express = require('express');
const routerAPI = express.Router();
const { getAllOrganism, getOrganismsByGroups, 
    getOrganismById, deleteOrganismController, 
    updateOrganism, statisticOrganism, 
    getOrganismByNames} = require("../controller/organisms.controller");


routerAPI.get('/all-organism', getAllOrganism); //OK url: http://127.0.0.1:3001/api/v1/organism/all-organism

routerAPI.get('/search/', getOrganismByNames); //OK url: http://127.0.0.1:3001/api/v1/organism/search?kw=bup Vang

routerAPI.get('/', getOrganismsByGroups); //OK url: http://127.0.0.1:3001/api/v1/organism?groupOfOrganismId=1

routerAPI.get('/statics', statisticOrganism); //OK url: http://127.0.0.1:3001/api/v1/organism/statics?groupOfOrganismId=1&groupOfOrganismId=2..

routerAPI.get('/:organism_Id', getOrganismById); //OK url: http://127.0.0.1:3001/api/v1/organism/2

routerAPI.delete('/:organism_Id', deleteOrganismController);

routerAPI.put('/:organism_Id', updateOrganism); 


module.exports = routerAPI;

