const express = require('express');
const router = express.Router();
const { getAllOrganism, getOrganismsByGroups, 
    getOrganismById, deleteOrganismController, 
    updateOrganism, statisticOrganism, 
    getOrganismByNames} = require("../controller/OrganismController");

const { authMiddleWareUpdate } = require("../middleware/authMiddleware");

router.get('/all-organism/?', getAllOrganism); //OK url: http://127.0.0.1:3001/api/organism/all-organism?page=1&limit=2

router.get('/search/', getOrganismByNames); //OK url: http://127.0.0.1:3001/api/organism/search?kw=bup Vang

router.get('/', getOrganismsByGroups); //OK url: http://127.0.0.1:3001/api/organism?groupOfOrganismId=1

router.get('/statics', statisticOrganism); //OK url: http://127.0.0.1:3001/api/organism/statics?groupOfOrganismId=1&groupOfOrganismId=2..

router.get('/:organism_Id', getOrganismById); //OK url: http://127.0.0.1:3001/api/organism/2

router.delete('/:organism_Id', authMiddleWareUpdate, deleteOrganismController);

router.put('/:organism_Id',authMiddleWareUpdate, updateOrganism); //OK url http://127.0.0.1:3001/api/organism/1

module.exports = router;

