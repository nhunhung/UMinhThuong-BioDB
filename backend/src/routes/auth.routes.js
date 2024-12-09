const express = require('express');
const { login } = require('../controller/auth.controller');

const routerAPI = express.Router();

// POST: /login
routerAPI.post('/login', login);

module.exports = routerAPI;
