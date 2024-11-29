const db = require("../config/database");
const { Orders } = db;

const postOrder = async (ordersData) => {
    try {
        const order = await Orders.create({
            name: ordersData.name,
            class_id: ordersData.class_id,
         
        });
        return order;
    } catch (error) {
        console.error("Error creating a new order: ", error.message);
        throw error;
    }
}

module.exports = {
    postOrder
}