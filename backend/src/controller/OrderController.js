
const OrderService = require("../services/OrderService")
const createOrder = async (req, res) => {
    try {
        const { order_name, class_id } = req.body;
        if (!order_name || !class_id) {
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
const createNewOrder = async (req, res) => {
    try {
        const { order_name, class_id } = req.body;
        const ordersData = { order_name, class_id };

        console.log(">>> Check data == ", ordersData);
        const newOrder = await OrderService.postOrder(ordersData);

        return res.status(201).json({
            message: 'Order created successfully!',
            data: newOrder
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
const getDetailOrder = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await OrderService.getDetailOrder(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    createNewOrder,
    getDetailOrder
}