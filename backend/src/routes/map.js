
const express = require('express');
const { getOrganismsWithLocation } = require('../controller/map');
const router = express.Router();

router.get('/map', getOrganismsWithLocation);

module.exports = router;
