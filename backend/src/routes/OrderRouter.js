const express = require('express')
const router = express.Router();
const OrderController = require("../controller/OrderController");
const { authMiddleWare } = require('../middleware/authMiddleware');
router.get('/get-details/:id', authMiddleWare, OrderController.getDetailOrder)
router.post('/create', authMiddleWare, OrderController.createOrder);
router.put('/update/:id', authMiddleWare, OrderController.updateOrder);
router.delete('/delete/:id', authMiddleWare, OrderController.deleteOrder);

module.exports = router