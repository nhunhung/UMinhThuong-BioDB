const express = require('express');
const routerAPI = express.Router();
const { createNewOrder } = require("../controller/orders.controller");
const validateOrders = require("../middleware/validateData/validateOrdersData");


routerAPI.post('/add', validateOrders, createNewOrder);



module.exports = routerAPI;