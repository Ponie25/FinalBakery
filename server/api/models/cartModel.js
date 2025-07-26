const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String for combo packs
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    
    total_price: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;