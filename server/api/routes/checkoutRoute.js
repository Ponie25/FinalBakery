const express = require("express");
const router = express.Router();
const CheckoutController = require("../controllers/checkoutController");

// POST /api/checkout - Create new order
router.post("/", CheckoutController.createOrder);

// POST /api/checkout/cart - Create order from cart
router.post("/cart", CheckoutController.createOrderFromCart);

// GET /api/checkout/orders/:userId - Get user's orders
router.get("/orders/:userId", CheckoutController.getUserOrders);

// PUT /api/checkout/orders/:orderId/status - Update order status
router.put("/orders/:orderId/status", CheckoutController.updateOrderStatus);

module.exports = router;