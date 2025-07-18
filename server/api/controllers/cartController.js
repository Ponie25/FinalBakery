const Cart = require("../models/cartModel");

// Get user's cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user_id: userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addItemToCart = async (req, res) => {
    try {
        const newItem = req.body;
        let cart = await Cart.findOne({ user_id: newItem.user_id });

        // Create cart if doesn't exist
        if (!cart) {
            cart = new Cart({ user_id: newItem.user_id, items: [], total_price: 0 });
        }

        // Check if item already exists
        const existingItem = cart.items.find(cartItem => 
            cartItem.product_id.toString() === newItem.product_id.toString()
        );

        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            cart.items.push(newItem);
        }

        // Calculate total price 
        cart.total_price += newItem.price * newItem.quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item
const updateItemQuantity = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.product_id.toString() === productId.toString());
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Store old quantity BEFORE updating
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        
        // Update total price correctly
        cart.total_price += (quantity - oldQuantity) * item.price;
        
        // Save and respond
        await cart.save();
        res.json({ message: "Quantity updated", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete cart item
const removeItemFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.product_id.toString() === productId.toString());
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        cart.total_price -= item.price * item.quantity;
        cart.items = cart.items.filter(item => item.product_id.toString() !== productId.toString());
        await cart.save();
        res.json({ message: "Item removed", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = [];
        cart.total_price = 0;
        await cart.save();
        res.json({ message: "Cart cleared", cart });
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