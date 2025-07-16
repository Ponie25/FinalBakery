const mongoose = require("mongoose");
const productRouter = require("../routes/productRoute");

const orderSchema = new mongoose.Schema({
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
    }
});