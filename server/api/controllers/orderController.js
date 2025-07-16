const Order = require("../models/orderModel");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const createOrder = async (req, res) => {

module.exports = {
    getAllOrders,
}