const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
    try {
        // Validate required fields
        const { customer_name, products, total_amount, customer_email, customer_phone, customer_address } = req.body;
        if (!customer_name || !products || !total_amount) {
            return res.status(400).json({ 
                message: "Missing required fields" 
            });
        }

        // Validate total_amount is a positive number
        if (typeof total_amount !== 'number' || total_amount <= 0) {
            return res.status(400).json({ 
                message: "Total amount must be a positive number" 
            });
        }

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ 
                message: "Products array is required and cannot be empty" 
            });
        }

        // Validate customer contact info
        if (!customer_email && !customer_phone) {
            return res.status(400).json({ 
                message: "Either email or phone is required for contact" 
            });
        }

        // Check if products exist
        for (const productId of products) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({ 
                    message: `Product ${productId} not found` 
                });
            }
        }

        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create order with proper data
        const orderData = {
            ...req.body,
            order_date: new Date(),
            status: "pending",
            order_number: orderNumber,
            payment_method: req.body.payment_method || "cash",
            payment_status: "pending"
        };

        const order = new Order(orderData);
        await order.save();
        
        res.status(201).json({
            message: "Order created successfully", 
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order", 
            error: error.message
        });
    }
}

// Create order from cart
const createOrderFromCart = async (req, res) => {
    try {
        const { userId, customer_name, customer_email, customer_phone, customer_address } = req.body;
        
        if (!userId || !customer_name) {
            return res.status(400).json({ 
                message: "User ID and customer name are required" 
            });
        }

        // Get user's cart
        const cart = await Cart.findOne({ user_id: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ 
                message: "Cart is empty" 
            });
        }

        // Extract product IDs from cart items
        const products = cart.items.map(item => item.product_id);

        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create order from cart
        const orderData = {
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            products,
            total_amount: cart.total_price,
            order_date: new Date(),
            status: "pending",
            order_number: orderNumber,
            payment_method: req.body.payment_method || "cash",
            payment_status: "pending"
        };

        const order = new Order(orderData);
        await order.save();

        // Clear the cart after successful order
        cart.items = [];
        cart.total_price = 0;
        await cart.save();
        
        res.status(201).json({
            message: "Order created successfully from cart", 
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order from cart", 
            error: error.message
        });
    }
}

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ 
            customer_email: { $exists: true } 
        }).populate('products');
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user orders", 
            error: error.message
        });
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ 
                message: "Invalid status. Must be pending, delivered, or cancelled" 
            });
        }

        const order = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ 
                message: "Order not found" 
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update order status", 
            error: error.message
        });
    }
}

module.exports = {
    createOrder,
    createOrderFromCart,
    getUserOrders,
    updateOrderStatus
}