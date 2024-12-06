
const OrderService = require("../services/OrderService")
const createOrder = async (req, res) => {
    try {
        const { name, class_id } = req.body;
        if (!name || !class_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }

        const respone = await OrderService.createOrder(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateOrder = async (req, res) => {
    try {
        const order_id = req.params.id;

        if (!order_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'order_id not exists'
            })
        }
        const respone = await OrderService.updateOrder(order_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteOrder = async (req, res) => {
    try {
        const order_id = req.params.id;
        if (!order_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'order is not exists'
            })
        }
        const response = await OrderService.deleteOrder(order_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createOrder,
    updateOrder,
    deleteOrder
}