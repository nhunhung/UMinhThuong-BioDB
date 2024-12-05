const { postOrder } = require("../service/orders.service")

const createNewOrder= async (req, res) => {
    try {
        const { order_name, class_id } = req.body;
        const ordersData = { order_name, class_id };

        console.log(">>> Check data == ", ordersData);
        const newOrder = await postOrder(ordersData);

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
module.exports = { createNewOrder }