const Cart = require("../models/cartModel");

// Get user's cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user_id: userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addItemToCart = async (req, res) => {
    try {
        if (!req.user) {
            console.error('ERROR: req.user is not set! Auth middleware may not be working.');
            return res.status(401).json({ message: "Authentication required" });
        }
        
        const userId = req.user._id;
        
        const { product_id, quantity, price } = req.body;
        
        if (!product_id || !quantity || !price) {
            return res.status(400).json({ message: "Missing required fields: product_id, quantity, price" });
        }

        let cart = await Cart.findOne({ user_id: userId });

        // Create cart if doesn't exist
        if (!cart) {
            const cartData = { 
                user_id: userId, 
                items: [], 
                total_price: 0 
            };
            cart = new Cart(cartData);
        }

        // Check if item already exists
        const existingItem = cart.items.find(cartItem => 
            cartItem.product_id.toString() === product_id.toString()
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product_id, quantity, price });
        }

        // Recalculate total price 
        cart.total_price = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Add to cart error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ message: error.message });
    }
};

// Update cart item
const updateItemQuantity = async (req, res) => {
    try {
        const userId = req.user._id || req.user;
        const { product_id, quantity } = req.body;

        if (!product_id || quantity === undefined) {
            return res.status(400).json({ message: "Missing required fields: product_id, quantity" });
        }

        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find and update the item
        const item = cart.items.find(cartItem => 
            cartItem.product_id.toString() === product_id.toString()
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;
        
        // Recalculate total price
        cart.total_price = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id || req.user;
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({ message: "Missing required field: product_id" });
        }

        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item
        cart.items = cart.items.filter(cartItem => 
            cartItem.product_id.toString() !== product_id.toString()
        );
        
        // Recalculate total price
        cart.total_price = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user._id || req.user;
        const cart = await Cart.findOne({ user_id: userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        cart.total_price = 0;
        await cart.save();
        
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart
};