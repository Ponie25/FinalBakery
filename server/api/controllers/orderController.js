const Order = require("../models/orderModel");

const getAllOrders = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const orders = await Order.find().populate('products').sort({ order_date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { id } = req.params;
        const order = await Order.findById(id).populate('products');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { id } = req.params;
        const updateData = req.body;
        
        const order = await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('products');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderStats = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
        const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });
        
        // Calculate total revenue
        const revenueData = await Order.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, totalRevenue: { $sum: '$total_amount' } } }
        ]);
        
        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
        
        res.status(200).json({
            totalOrders,
            pendingOrders,
            deliveredOrders,
            cancelledOrders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderStats
}