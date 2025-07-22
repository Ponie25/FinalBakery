const mongoose = require("mongoose");
const productRouter = require("../routes/productRoute");

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: false
    },
    customer_phone: {
        type: String,
        required: false
    },
    customer_address: {
        type: String,
        required: false
    },
    order_date: {
        type: Date,
        required: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending"
    },
    payment_method: {
        type: String,
        enum: ["cash", "card", "bank_transfer", "balance"],
        required: true
    },
    payment_status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;